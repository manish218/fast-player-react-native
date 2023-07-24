export interface Country {
    name: string;
    code: string;
    languages: string[];
    flag: string;
}


export interface Channel {
    id: string,
    name: string,
    alt_names?: string,
    network?: string,
    country: string,
    languages: string[],
    categories: string[], //taxonomy
    is_nsfw: false, //adult content
    website?: string,
    logo?: string
}

export interface Stream {
    channel: string, //channel id
    url: string,
}