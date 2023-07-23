import { PlatformColor, StyleSheet, useColorScheme } from "react-native";

const CommonStyles = StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    listItemText: {
        fontSize: 20,
        flexWrap: 'nowrap',
        fontWeight: 'bold',
        color: 'white',
        marginStart: 20,
    },
    flagString: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        paddingStart: 10
    },
    listItem: {
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: 'royalblue',
        padding: 20,
        margin: 8,
        borderRadius: 8
    },
    splashImage: {
        height: 200,
        width: 200,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    channelLogo: {
        height: 48,
        width: 48,
        marginStart: 10
    }
});


export default CommonStyles