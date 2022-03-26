import Store from 'jfs';
import { Offer } from './types';


export async function getFromDb(key: string): Promise<any> {

  const dbName = 'db';
  const db = new Store(dbName);
  return new Promise((resolve) => {
    db.get(key, (err, data) => {
      if (err) {
        resolve(null);
      } else {
        resolve(data);
      }
    });
  });
}

export async function saveToDb(value: Offer): Promise<any> {
  const dbName = 'db';
  const db = new Store(dbName);
  return await db.save(value.id, value);

}
