import { IPTV_ORG_API_BASE_URL } from "../../common/consts";
import { Channel, Country } from "../../common/models";


export async function fetchChannels(country: Country): Promise<Channel[]> {
    const url = IPTV_ORG_API_BASE_URL + 'channels.json'
    try {
        const response = await fetch(url)
        const channelsList: Channel[] = await response.json()
        console.log(channelsList)
        return filterChannelsForCountry(channelsList, country)
    } catch (e) {
        console.log(e)
        return []
    }
}

function filterChannelsForCountry(channelsList: Channel[], country: Country): Channel[] {
    return channelsList.filter(channel => channel.country === country.code && channel.logo != null)
}