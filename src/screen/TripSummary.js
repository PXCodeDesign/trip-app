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
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_KEY from '../key';

function TripSummaryScreen() {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(`${selectedCity} Seyahati`);
  }, [selectedCity]);

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
          style={{
            marginVertical: 10,
            paddingTop: 20,
            gap: 5,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Seyahat ismi
          </Text>
          <TextInput
            style={{
              color: 'black',
              backgroundColor: '#efefef',
              fontSize: 16,
              fontWeight: '400',
              borderRadius: 10,
              paddingHorizontal: 10,
              height: 40,
            }}
            value={value}
            placeholder="Seyahat ismi"
            onChangeText={setValue}
          />
          {/* <Text>
            Başlama Saati:
            {startTime ? startTime.toLocaleTimeString() : 'Henüz seçilmedi'}
          </Text>
          <Text>
            Bitiş Saati:
            {endTime ? endTime.toLocaleTimeString() : 'Henüz seçilmedi'}
          </Text> */}
        </View>

        <View
          style={{
            marginVertical: 10,
            gap: 5,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Varış Noktası
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: '400',
              backgroundColor: '#efefef',
              padding: 10,
              borderRadius: 10,
            }}>
            {selectedCity}
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10,
            gap: 5,
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Ayrıntılar
          </Text>
          <View
            style={{
              backgroundColor: '#efefef',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
            }}>
            <Icon name="calendar" fill="black" size={16} />
            <View style={{gap: 3}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                }}>
                Seyahat Tarihi
              </Text>
              <Text
                style={{
                  color: '#0f0f0f',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                Ocak 23 - Ocak 25
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AboutScreen')}
          style={{
            backgroundColor: '#efefef',
            borderRadius: 10,
            marginHorizontal: 20,
            marginBottom: 20,
            paddingVertical: 10,
            paddingHorizontal: 10,
            position: 'absolute',
            bottom: 60,
            width: '90%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            about
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('MapsScreen')}
          style={{
            backgroundColor: '#efefef',
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
            Seyahati Oluştur
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default TripSummaryScreen;
