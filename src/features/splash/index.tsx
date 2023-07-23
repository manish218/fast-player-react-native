import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CommonStyles from "../../common/styles/common";
import { useEffect } from "react";


export function SplashViewNew({ navigation }) {

  useEffect(() => {
    setTimeout(() => navigation.replace('Countries Listing'), 2000)
  }, [])


  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
    flex: 1,
  }

  return (<SafeAreaView style={backgroundStyle}>
    <View style={{ ...CommonStyles.containerView, flexDirection: 'column' }}>
      <Image source={require('./img/iptvorg.png')} style={CommonStyles.splashImage} />
      <View style={{
        backgroundColor: 'salmon', marginTop: 30, borderRadius: 10,
        borderWidth: 1,
      }}>
        <Text style={{ ...CommonStyles.listItemText, fontSize: 30 }}>{'  Player  '}</Text>
      </View>
    </View>
  </SafeAreaView >)
}

