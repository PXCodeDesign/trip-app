import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Search from '../components/Search';
import TrendingCity from '../components/TrendingCity';
import {Icon} from '../Icon';
import CreateCard from '../components/CreateCard';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="logo" size={100} fill="black" />
      </View>
      <TrendingCity />
      <CreateCard />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 50,
          padding: 10,
          backgroundColor: 'black',
        }}
        onPress={() => navigation.navigate('Create')}>
        <Icon name="add" size={32} fill="white" />
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          borderRadius: 50,
          padding: 10,
          backgroundColor: 'black',
        }}
        onPress={() => navigation.navigate('Deneme')}>
        <Icon name="location" size={32} fill="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', height: '100%'},
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header_title: {},
  header_text: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },
  add: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 1,
  },
});

export default HomeScreen;
