import AsyncStorage from '@react-native-async-storage/async-storage';
import { Channel, Country, Stream } from '../common/models';


const COUNTRIES_LIST_STORE_KEY = 'COUNTRIES_LIST_STORE_KEY'
const CHANNELS_LIST_STORE_KEY = 'CHANNELS_LIST_STORE_KEY'
const STREAMS_LIST_STORE_KEY = 'STREAMS_LIST_STORE_KEY'
const LAST_API_SYNC_TIME = 'LAST_API_SYNC_TIME'

export class DiskCache {
    //countries related
    static cacheCountrisList = async (countries: Country[]) => { storeItems(COUNTRIES_LIST_STORE_KEY, countries) }
    static fetchCountriesList = async () => { return readItems<Country>(COUNTRIES_LIST_STORE_KEY) }

    //channels related
    static cacheChannelsList = (channels: Channel[]) => { return storeItems(CHANNELS_LIST_STORE_KEY, channels) }
    static fetchChannelsList = async () => { return readItems<Channel>(CHANNELS_LIST_STORE_KEY) }

    //streams related
    static cacheStreamsList = async (streams: Stream[]) => { return storeItems(STREAMS_LIST_STORE_KEY, streams) }
    static fetchStreamsList = async  () => { return readItems<Stream>(STREAMS_LIST_STORE_KEY) }

    //streams related
    static saveLastApiSyncTime = async (timeMs: number) => { storeValue(LAST_API_SYNC_TIME, timeMs) }
    static getLastApiSyncTime = async () => { return getValue<number>(LAST_API_SYNC_TIME) }
}


//save list of objects
async function storeItems<T>(key: string, items: T[]) {
    try {
        const jsonValue = JSON.stringify(items);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
    }
};

//fetch list of objects
async function readItems<T>(key: string) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        const items: T[] = jsonValue != null ? JSON.parse(jsonValue) : [];
        return items
    } catch (e) {
        console.log(e)
        return []
    }
};

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