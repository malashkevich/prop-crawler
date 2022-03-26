import Logger from 'logger';

const logger = Logger.createLogger('crawler.log');
logger.setLevel('debug');

export const log = logger;
