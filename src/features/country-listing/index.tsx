import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CommonStyles from "../../common/styles/common";
import React, { useEffect, useState } from "react";
import { getCountiesList, getCountiesListLocal } from "./api";
import { Country } from "../../common/models";

export function CountriesListingView({ navigation }) {
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getCountiesList().then(
      (countries) => {
        setLoading(false)
        setCountries(countries)
      }
    )
  }, [])

  function listItemClickHandler(country: Country) {
    console.log(`Country selected = ${country.name} : ${country.code}`)
    navigation.push('Channels Listing', { country })
  }

  type CountryItemProps = {
    item: Country
  };

  const renderCountryViewItem = (countryItemProp: CountryItemProps) => (
    <Pressable onPress={() => listItemClickHandler(countryItemProp.item)}>
      <View style={{ ...CommonStyles.listItem, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={CommonStyles.flagString}>{countryItemProp.item.flag}</Text>
        <Text style={CommonStyles.listItemText}>{countryItemProp.item.name}</Text>
      </View>
    </Pressable>
  );

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.darker,
    flex: 1,
  }

  return (<SafeAreaView style={backgroundStyle}>
    {isLoading ? (
      (<ActivityIndicator size={'large'} />)
    )
      :
      (<FlatList
        data={countries}
        keyExtractor={item => item.code}
        renderItem={renderCountryViewItem}
      />)}
  </SafeAreaView>)
}
