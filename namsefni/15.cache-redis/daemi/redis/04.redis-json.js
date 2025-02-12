/*
Keyrt með:
node 04.redis-json.js

Býr til almenn get og set föll til að cachea gögn sem JSON.
*/

import redis from 'redis';
import util from 'util';

// Ættum að lesa úr .env
const REDIS_URL = 'redis://127.0.0.1:6379/0';

// Ef við myndum vilja slökkva á caching, sleppum að skilgreina REDIS_URL
let client;

if (REDIS_URL) {
  client = redis.createClient({ url: REDIS_URL });
}

const asyncGet = util.promisify(client.get).bind(client);
const asyncSet = util.promisify(client.set).bind(client);

/**
 * Returns cached data or null if not cached.
 * @param {string} cacheKey Cache key to for data for
 * @returns {object} Data as the cached object, otherwise null
 */
async function get(cacheKey) {
  // Slökkt á cache
  if (!client || !asyncGet) {
    return null;
  }

  let cached;

  try {
    cached = await asyncGet(cacheKey);
  } catch (e) {
    console.warn(`unable to get from cache, ${cacheKey}, ${e.message}`);
    return null;
  }

  if (!cached) {
    return null;
  }

  let result;

  try {
    result = JSON.parse(cached);
  } catch (e) {
    console.warn(`unable to parse cached data, ${cacheKey}, ${e.message}`);
    return null;
  }

  return result;
}

/**
 * Cache data for a specific time under a cacheKey.
 *
 * @param {string} cacheKey Cache key to cache data under
 * @param {object} data Data to cache
 * @param {number} ttl Time-to-live of cache
 * @returns {Promise<boolean>} true if data cached, otherwise false
 */
async function set(cacheKey, data, ttl) {
  if (!client || !asyncSet) {
    return false;
  }

  try {
    const serialized = JSON.stringify(data);
    await asyncSet(cacheKey, serialized, 'EX', ttl);
  } catch (e) {
    console.warn('unable to set cache for ', cacheKey);
    return false;
  }

  return true;
}

async function main() {
  const data = { str: 'hello world', list: [1, 2, 3, 4] };

  const cachedData = await get('data-cache');

  console.log('cached data', cachedData);

  const cached = await set('data-cache', data, 10);

  console.log('was cached?', cached);

  client.quit();
}

main().catch((err) => { console.error(err); });
