import AsyncStorage from '@react-native-async-storage/async-storage';
import { Channel, Country, Stream } from '../common/models';


const COUNTRIES_LIST_STORE_KEY = 'COUNTRIES_LIST_STORE_KEY'
const CHANNELS_LIST_STORE_KEY = 'CHANNELS_LIST_STORE_KEY'
const STREAMS_LIST_STORE_KEY = 'STREAMS_LIST_STORE_KEY'
const LAST_API_SYNC_TIME = 'LAST_API_SYNC_TIME'

interface InMemCache {
    cacheCountrisList: Country[];
    cacheChannelsList: Channel[];
    cacheStreamsList: Stream[];
}

const inMemCache: InMemCache = {
    cacheCountrisList: [],
    cacheChannelsList: [],
    cacheStreamsList: []
}

/**
 * TODO: 
 * 1. Refactor to remove duplicated logic
 * 2. Prime the cache when writing to Disk
 */
export class DiskCache {
    //countries related
    static cacheCountrisList = async (countries: Country[]) => { storeItems(COUNTRIES_LIST_STORE_KEY, countries) }
    static fetchCountriesList = async () => {
        if (!inMemCache.cacheCountrisList.length) {
            const items: Country[] = await readItems<Country>(COUNTRIES_LIST_STORE_KEY)
            inMemCache.cacheCountrisList.push(...items)
        }
        return inMemCache.cacheCountrisList
    }

    //channels related
    static cacheChannelsList = (channels: Channel[]) => { return storeItems(CHANNELS_LIST_STORE_KEY, channels) }
    static fetchChannelsList = async () => {
        if (!inMemCache.cacheChannelsList.length) {
            const items = await readItems<Channel>(CHANNELS_LIST_STORE_KEY)
            inMemCache.cacheChannelsList.push(...items)
        }
        return inMemCache.cacheChannelsList
    }

    //streams related
    static cacheStreamsList = async (streams: Stream[]) => { return storeItems(STREAMS_LIST_STORE_KEY, streams) }
    static fetchStreamsList = async () => {
        if (!inMemCache.cacheStreamsList.length) {
            const items = await readItems<Stream>(STREAMS_LIST_STORE_KEY)
            inMemCache.cacheStreamsList.push(...items)
        }
        return inMemCache.cacheStreamsList
    }

    //streams related
    static saveLastApiSyncTime = async (timeMs: number) => { storeValue(LAST_API_SYNC_TIME, timeMs) }
    static getLastApiSyncTime = async () => { return getValue<number>(LAST_API_SYNC_TIME) }
}


//save list of objects
async function storeItems<T>(key: string, items: T[]) {
    try {
        // console.log(`storeItems ${items.length}`)
        await AsyncStorage.setItem(key + '_ITEM_COUNT', `${items.length}`);
        await Promise.all(storeItemToAsyncStore(key, items)).then()
    } catch (e) {
        console.log(e)
    }
}

function storeItemToAsyncStore<T>(baseKey: string, items: T[]): Promise<void>[] {
    return items.map((item, index) => {
        const jsonValue = JSON.stringify(item);
        // console.log(`storeItemToAsyncStore: ${jsonValue}`)
        return AsyncStorage.setItem(baseKey + `_${index}`, jsonValue)
    })
}

//fetch list of objects
async function readItems<T>(key: string) {
    try {
        const itemsCountStr = await AsyncStorage.getItem(key + '_ITEM_COUNT');
        const itemCount = Number(itemsCountStr)
        // console.log(`readItems: ${itemCount}`)
        const items: T[] = []
        await Promise.all(fetchItemFromAsyncStore(key, itemCount)).then(it => {
            it.forEach(jsonValue => {
                // console.log(`readItems Json: ${jsonValue}`)
                if (jsonValue) {
                    const item = JSON.parse(jsonValue)
                    // console.log(`readItems Item: ${item}`)
                    items.push(item)
                }
            })
        })
        return items
    } catch (e) {
        console.log(e)
        return []
    }
};

function fetchItemFromAsyncStore<T>(baseKey: string, itemCount: number): Promise<string | null>[] {
    const readItemPromises: Promise<string | null>[] = []
    for (let i = 0; i < itemCount; i++) {
        readItemPromises.push(AsyncStorage.getItem(baseKey + `_${i}`));
    }
    return readItemPromises
}

//save one object
async function storeValue<T>(key: string, item: T) {
    try {
        const jsonValue = JSON.stringify(item);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
    }
};

//fetch one object
async function getValue<T>(key: string) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        const item: T = jsonValue != null ? JSON.parse(jsonValue) : undefined;
        return item
    } catch (e) {
        console.log(e)
        return undefined
    }
};