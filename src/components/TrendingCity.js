import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TrendingCity() {
  const navigation = useNavigation();

  const data = [
    {
      id: 0,
      title: 'Maldives',
      uri: 'https://images.unsplash.com/photo-1573935448851-e0549896410f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 1,
      title: 'İstanbul',
      uri: 'https://images.unsplash.com/photo-1421930451953-73c5c9ae9abf?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'New York',
      uri: 'https://images.unsplash.com/photo-1602940659805-770d1b3b9911?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <FlatList
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          paddingHorizontal: 10,
        }}
        horizontal={true}
        keyExtractor={item => item.id}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailPage', {item})}
            style={{
              height: 326,
              width: 210,
              marginHorizontal: 10,
              marginVertical: 20,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              overflow: 'hidden',
              elevation: 10, // Android için gölge
              shadowColor: '#000', // iOS için gölge
              shadowOffset: {width: 0, height: 10},
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: item.uri}}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: 'white',
                position: 'absolute',
                bottom: 25,
                left: 10,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});

export default TrendingCity;
