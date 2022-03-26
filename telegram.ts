import { log } from './logger';

process.env.NTBA_FIX_319 = '1';
process.env.NTBA_FIX_350 = '1';
import * as fs from 'fs';
import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';
import { bot_key, chatid } from './constants';
import { Offer } from './types';


const bot = new TelegramBot(bot_key, { polling: false });


export async function sendMessage(offer: Offer) {
  const path = `db/${ offer.id }.webp`
  await download(offer.image, path);

  log.debug(`Sending offer ${offer.id} to chat`);

  const { title, price, location, date, url } = offer;

  const message = `<a href="${url}">${title}</a>\n\n${ price }\n${ location }, ${ date }`;

  await bot.sendPhoto(chatid, path, { caption: message, parse_mode: 'HTML' });


}

async function download(url: string, path: string) {
  return new Promise<void>((async resolve => {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(path, buffer, () => resolve());
  }))
}
