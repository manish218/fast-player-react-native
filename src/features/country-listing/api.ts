import { IPTV_ORG_API_BASE_URL } from "../../common/consts";
import { Country } from "../../common/models";
import CountriesJson from './countries.json';


export function getCountiesListLocal(): Country[] {
    console.log('***** \\\\\ ******')
    console.log(CountriesJson)
    return <Country[]>CountriesJson
}

export async function getCountiesList(): Promise<Country[]> {
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