import { CronJob } from 'cron';
import { crawl } from './crawler';
import { getFromDb, saveToDb } from './db';
import { sendMessage } from './telegram';
import { log } from './logger';


async function research(): Promise<void> {
  const offers = await crawl();
  for (const offer of offers) {
    let existing = await getFromDb(offer.id);
    if (!existing) {
      await saveToDb(offer);
      await sendMessage(offer);
    }
  }
}

const job = new CronJob('* * * * *', async () => {
  log.debug('Triggering research at ' + new Date().toLocaleTimeString());
  try {
    await research();
    log.debug('Research done');
  } catch (e) {
    log.debug('Error while doing research: ' + e);
  }
});


log.debug('Starting research job');
log.debug('Starting initial research');
research().then(() => job.start())

