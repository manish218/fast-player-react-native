import { SafeAreaView, View, useColorScheme } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen";

export function StreamPlayerView({ navigation }) {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
        flex: 1,
      }

    return (<SafeAreaView style={backgroundStyle}>
        <View />
    </SafeAreaView>
    )
}