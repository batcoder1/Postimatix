import ioredis from 'ioredis';

import { logger } from '../logger/index';

export class RedisStore {
  private r: ioredis.Redis;
  constructor(r: ioredis.Redis) {
    this.r = r;
  }
  async publish(channel:string, message: any) {
    return await new Promise((resolve, reject) => {
      this.r.publish(channel,JSON.stringify(message),(err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });

    });
  }
  async subscribe(channels:string[]) {
    return await new Promise((resolve, reject) => {
      this.r.subscribe(channels,(err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });

    });
  }

  async get(key: string) {
    return await new Promise((resolve, reject) => {
      this.r.get(key, (err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  set(key: string, value: string, expiry?: number) {
    if (undefined === expiry) {
      void this.r.set(key, value);
      return;
    }

    void this.r.set(key, value, 'EX', expiry);
  }

  async getJSON(key: string) {
    return await new Promise((resolve, reject) => {
      this.r.get(key, (err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          resolve(JSON.parse(result));
        } catch (e) {
          return reject(e);
        }
      });
    });
  }

  async exists(key: string) {
    return this.r.exists(key);
  }

  async expire(key: string, expiry: number) {
    return this.r.expire(key, expiry);
  }

  async remove(key: string) {
    return this.r.del(key);
  }

  async list(match: string) {
    return this.r.keys(match);
  }

  setJSON<T>(key: string, value: T, expiry?: number) {
    try {
      const v = JSON.stringify(value);
      if (undefined === expiry) {
        void this.r.set(key, v);
        return;
      }

      void this.r.set(key, v, 'EX', expiry);
    } catch (e) {
      logger.error('Unable to set redis value', e);
      return;
    }
  }
}
