import got from 'got';
import cheerio, { Element } from 'cheerio';
import { noImageUrl, urlOLX, urlOTODOM } from './constants';
import { Offer } from './types';
import { log } from './logger';


export async function crawl(): Promise<Offer[]> {
  return await Promise.all([
    crawlOLX(),
    crawlOTODOM(),
  ])
    .then(([olx, otodom]) => {
      return [...olx, ...otodom];
    });
}

async function crawlOTODOM(): Promise<Offer[]> {
  const html = await got(urlOTODOM);
  const $ = cheerio.load(html.body);
  log.debug('Crawling OTODOM...');

  const promoted = $('[data-cy=search.listing.promoted] li');
  const regular = $('[data-cy=search.listing] li');


  return [...promoted.toArray(), ...regular.toArray()].map((element: Element) => {
    const $element = $(element);
    const title = $element.find('article h3').text();
    const location = $element.find('article>p span').text();
    const price = $element.find('article>div>p').first().text();
    const date = 'today';
    const relativeUrl = $element.children('a').first().attr('href') || ''
    const url = 'https://otodom.pl' + relativeUrl;
    const image = $element.find('aside source').first().attr('srcset') || noImageUrl;
    const id = relativeUrl.split('-').pop() || relativeUrl;


    return {
      title,
      price,
      location,
      date,
      url,
      id,
      image,
    }
  });
}


async function crawlOLX(): Promise<Offer[]> {
  const html = await got(urlOLX);
  const $ = cheerio.load(html.body);

  log.debug('Crawling OLX...');
  return $('.offer')
    .map((i: number, element: Element) => {
      let title = $(element).find('.title-cell strong').text();
      let price = $(element).find('.price strong').text();
      let location = $(element).find('[data-icon=location-filled]').parent().text();
      let date = $(element).find('[data-icon=clock]').parent().text();
      let url = $(element).find('.title-cell a').attr('href') || 'no url';
      let id = $(element).find('.offer-wrapper>table').first().attr('data-id') || 'no id';
      let image = $(element).find('.photo-cell img').attr('src') || noImageUrl;
      return {
        title,
        price,
        location,
        date,
        url,
        id,
        image,
      }
    })
    .toArray()
}
