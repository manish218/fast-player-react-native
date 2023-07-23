/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashViewNew } from './src/features/splash';
import { CountriesListingView } from './src/features/country-listing';
import { ChannelsListingView } from './src/features/channels-listing';

const Stack = createNativeStackNavigator();


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {/* <Stack.Screen name="Splash">
          {(props) => <SplashViewNew{...props} />}
        </Stack.Screen> */}
        <Stack.Screen name="Countries Listing">
          {(props) => <CountriesListingView{...props} />}
        </Stack.Screen>
        <Stack.Screen name="Channels Listing">
          {(props) => <ChannelsListingView{...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
