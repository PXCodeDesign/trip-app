import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';

import {Icon} from '../Icon';
import ChooseCard from '../components/ChooseCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChoosePlaceScreen() {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // AsyncStorage'den seçilen şehiri al
    const fetchData = async () => {
      const city = await AsyncStorage.getItem('selectedCity');
      setSelectedCity(city);
    };

    fetchData();
  }, []);
  console.log(selectedCity);
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
    {
      id: 3,
      title: 'Maldives',
      uri: 'https://images.unsplash.com/photo-1573935448851-e0549896410f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'İstanbul',
      uri: 'https://images.unsplash.com/photo-1421930451953-73c5c9ae9abf?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 5,
      title: 'New York',
      uri: 'https://images.unsplash.com/photo-1602940659805-770d1b3b9911?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          marginTop: 50,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}>
        <View
          style={{marginVertical: 10, paddingHorizontal: 20, paddingTop: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginVertical: 5,
            }}>
            Seyahatinizde kaçırmamanız gereken yerleri seçin
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#efefef',
            borderRadius: 10,
            marginVertical: 5,
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 4, // Android için shadow
            // shadowColor: 'black', // iOS için shadow rengi
            // shadowOffset: {width: 0, height: 2}, // iOS için shadow offset
            // shadowOpacity: 0.5, // iOS için shadow opasite
            // shadowRadius: 2,
            overflow: 'hidden',
          }}>
          <Icon name="search" size={24} />
          <TextInput
            style={{
              color: 'black',
              backgroundColor: '#efefef',
              fontSize: 16,
              fontWeight: '500',
            }}
            placeholder="Search.."
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginVertical: 5,
              marginHorizontal: 20,
            }}>
            {selectedCity}'da mutlaka görülmeli
          </Text>
        </View>
        <FlatList
          style={{
            flexDirection: 'column',
          }}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => <ChooseCard item={item} />}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ChoosePlace')}
          style={{
            flexDirection: 'row',
            backgroundColor: '#efefef',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 20,
            paddingVertical: 10,
            paddingHorizontal: 10,
            position: 'absolute',
            bottom: 10,
            width: '90%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Seyehat planı oluştur
          </Text>
          <Icon name="routing" fill="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChoosePlaceScreen;
