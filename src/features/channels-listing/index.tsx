import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CommonStyles from "../../common/styles/common";
import { useEffect, useState } from "react";
import { fetchChannels } from "./api";
import { Channel, Country } from "../../common/models";


export function ChannelsListingView({ route, navigation }) {

    const [isLoading, setIsLoading] = useState(true)
    const [channels, setChannels] = useState<Channel[]>([])

    useEffect(() => {
        fetchChannels(country).then(
            (channels) => {
                console.log('****** >>>> *******')
                console.log(channels.length)
                setIsLoading(false)
                setChannels(channels)
            }
        )
    }, [])


    const { country } = route.params


    function listItemClickHandler(channel: Channel) {
        console.log(`Channel selected = ${channel.id}`)
        // navigation.push('Channels Listing', { country })
    }

    type ChannelItemProps = {
        item: Channel
    };

    const renderChannelViewItem = (channelItemProp: ChannelItemProps) => (
        <Pressable style={{ flex: 1 }} onPress={() => listItemClickHandler(channelItemProp.item)}>
            <View style={{ ...CommonStyles.listItem, flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch' }}>
                <Image style={CommonStyles.channelLogo} source={{ uri: channelItemProp.item.logo }} />
                <Text style={CommonStyles.listItemText}>{channelItemProp.item.name}</Text>
            </View>
        </Pressable>
    );

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
        flex: 1,
    }

    return (<SafeAreaView style={backgroundStyle}>
        {isLoading ?
            (<View style={CommonStyles.containerView}><ActivityIndicator size={'large'} /> </View>)
            :
            (<FlatList
                data={channels}
                keyExtractor={item => item.id}
                renderItem={renderChannelViewItem}
            />)}
    </SafeAreaView>)
}

