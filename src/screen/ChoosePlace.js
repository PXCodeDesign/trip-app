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
import API_KEY from '../key';

function ChoosePlaceScreen() {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Local storage'dan seçilen şehiri al
        const cityInfoString = await AsyncStorage.getItem('selectedCity');
        const cityInfo = JSON.parse(cityInfoString);
        setSelectedCity(cityInfo.name);

        const startTimeValue = await AsyncStorage.getItem('@startTime');
        const endTimeValue = await AsyncStorage.getItem('@endTime');

        setStartTime(startTimeValue ? new Date(startTimeValue) : null);
        setEndTime(endTimeValue ? new Date(endTimeValue) : null);

        // Şehir adını ve koordinatları alarak gezilecek yerleri getir
        if (cityInfo && cityInfo.location) {
          const {latitude, longitude} = cityInfo.location;

          const placesResponse = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=museum&key=${API_KEY}`,
          );

          const placesData = await placesResponse.json();

          if (placesData.results && placesData.results.length > 0) {
            setPlaces(placesData.results);
          } else {
            console.warn('Gezilecek yer bulunamadı');
          }
        } else {
          console.warn('Şehir bilgileri eksik veya hatalı');
        }
      } catch (error) {
        console.error('Gezilecek yerleri alma hatası:', error);
      }
    };

    fetchData();
  }, []);

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
            backgroundColor: '#f5f7fc',
            borderRadius: 10,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#428bf8',
            marginHorizontal: 20,
          }}>
          <Icon name="search" size={24} />
          <TextInput
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '500',
              width: '95%',
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
          keyExtractor={item => item.place_id}
          data={places}
          renderItem={({item}) => <ChooseCard item={item} />}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('TripSummary')}
          style={{
            flexDirection: 'row',
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
            backgroundColor: '#1e1d2e',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Seyehat planı oluştur
          </Text>
          <Icon name="routing" fill="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChoosePlaceScreen;
