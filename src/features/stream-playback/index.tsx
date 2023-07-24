import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useEffect, useRef, useState } from "react";
import { DiskCache } from "../../cache/cache";
import CommonStyles from "../../common/styles/common";
import { VlCPlayerView } from "react-native-vlc-media-player";

export function StreamPlayerView({ route, navigation }) {

    const videoPlayer = useRef(null);
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
        flex: 1,
    }

    const [isLoading, setIsLoading] = useState(true)
    const [streamUrl, setStreamUrl] = useState('')

    useEffect(() => {
        DiskCache.fetchStreamsList().then(
            streamsList => {
                const stream = streamsList.find(stream =>
                    stream.channel === channel.id
                )
                if (stream) {
                    console.log(`Stream URL: ${stream.url}`)
                    setStreamUrl(stream.url)
                    setIsLoading(false)
                }
            }
        )
    }, [])

    const { channel } = route.params

    return (<SafeAreaView style={backgroundStyle}>
        {isLoading ?
            (<View style={CommonStyles.containerView}>
                <ActivityIndicator size={'large'} />
            </View>)
            :
            (<VlCPlayerView
                autoplay={false}
                url="https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
                showTitle={true}
                title="Big Buck Bunny"
                onLeftPress={()=>{}}
             />)}
    </SafeAreaView>
    )
}
