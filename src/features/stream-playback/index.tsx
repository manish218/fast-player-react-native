import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useEffect, useRef, useState } from "react";
import { DiskCache } from "../../cache/cache";
import CommonStyles from "../../common/styles/common";

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
        console.log('&&&&&&&&&&&&&&&&&&&&&&& 1')
        DiskCache.fetchStreamsList().then(
            streamsList => {
                console.log('&&&&&&&&&&&&&&&&&&&&&&& 2: ' + streamsList.length)
                console.log('&&&&&&&&&&&&&&&&&&&&&&& 3' + channel.id)
                const stream = streamsList.find(stream =>
                    stream.channel === channel.id
                )
                console.log('&&&&&&&&&&&&&&&&&&&&&&& 3' + stream?.url)
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
            (<View style={CommonStyles.containerView}>
                <Text style={CommonStyles.listItem}>{streamUrl}</Text>
            </View>)}
    </SafeAreaView>
    )
}

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});