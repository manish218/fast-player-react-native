import { DiskCache } from "../../cache/cache"
import { fetchAllChannels, fetchAllStreams, fetchCountiesList } from "../../common/api"
import { SelectedCountries } from "../../common/consts"
import { Channel, Country } from "../../common/models"


export async function fetchAndStoreValidSteamsChannelsAndCountries() {
    try {
        console.log('************************************************')

        const MS_IN_A_DAY = 24 * 60 * 60 * 1000
        const lastApiSyncTime = await DiskCache.getLastApiSyncTime()

        if (lastApiSyncTime && Date.now() - lastApiSyncTime < MS_IN_A_DAY) {
            console.log('Use cached API reponses')
            //hold for 500 ms and then return
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve('');
                }, 1000);
            });
        } else {
            const [allStreams, allChannels, allCountries] = await Promise.all([fetchAllStreams(), fetchAllChannels(), fetchCountiesList()])

            //1. Get validstreams
            const validStreams = allStreams.filter((stream) => stream.url && stream && stream.url.startsWith('https'))
            console.log('validStreams')
            console.log(validStreams.length)


            //2. Get channels with valid streams
            const channelIdsFromValidStreams = validStreams.map(stream => stream.channel)
            console.log('channelIdsFromValidStreams')
            console.log(channelIdsFromValidStreams.length)

            //3. Get and filter valid channels
            const validChannels = allChannels.filter((channel) => !channel.is_nsfw && channel.country && channel.id && channel.logo && channelIdsFromValidStreams.findIndex(item => channel.id === item) >= 0)

            console.log('validChannels')
            console.log(validChannels.length)

            //4. Prepare list of countries (codes) that have atleast one valid channel
            const countryIdsWithValidChannels = new Set()
            validChannels.forEach(channel => {
                if (SelectedCountries.find(country => channel.country === country)) {
                    countryIdsWithValidChannels.add(channel.country)
                }
            })
            console.log('validCountryCodes')
            console.log(countryIdsWithValidChannels.size)

            //5. Get and filter valid countries
            const validCountries = allCountries.filter(country => countryIdsWithValidChannels.has(country.code))

            console.log('validCountries')
            console.log(validCountries.length)


            //6. Save all the data in parallem
            await Promise.all([DiskCache.cacheStreamsList(validStreams), DiskCache.cacheChannelsList(validChannels), DiskCache.cacheCountrisList(validCountries)])

            await DiskCache.saveLastApiSyncTime(Date.now())
        }

        console.log('************************************************')
    } catch (e) {
        console.log(e)
    }

}

