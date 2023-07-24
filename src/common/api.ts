import { IPTV_ORG_API_BASE_URL } from "./consts"
import { Channel, Country, Stream } from "./models"

export async function fetchCountiesList(): Promise<Country[]> {
    try {
        const url = IPTV_ORG_API_BASE_URL + 'countries.json'
        const response = await fetch(url)
        const actualData: Country[] = await response.json()
        return actualData
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function fetchAllChannels(): Promise<Channel[]> {
    const url = IPTV_ORG_API_BASE_URL + 'channels.json'
    try {
        const response = await fetch(url)
        const channelsList: Channel[] = await response.json()
        return channelsList
    } catch (e) {
        console.log(e)
        return []
    }
}

export async function fetchAllStreams(): Promise<Stream[]> {
    const url = IPTV_ORG_API_BASE_URL + 'streams.json'
    try {
        const response = await fetch(url)
        const allStreamsList: Stream[] = await response.json()
        return allStreamsList
    } catch (e) {
        console.log(e)
        return []
    }
}