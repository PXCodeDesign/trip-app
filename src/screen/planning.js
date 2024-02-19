import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage ekleyin
import {Icon} from '../Icon';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function PlanningScreen() {
  const navigation = useNavigation();

  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  // AsyncStorage key'leri
  const START_TIME_KEY = '@startTime';
  const END_TIME_KEY = '@endTime';

  // AsyncStorage'den başlangıç ve bitiş saatlerini almak için useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = await AsyncStorage.getItem(START_TIME_KEY);
        const endTime = await AsyncStorage.getItem(END_TIME_KEY);

        if (startTime) {
          setSelectedStartTime(new Date(startTime));
        }

        if (endTime) {
          setSelectedEndTime(new Date(endTime));
        }
      } catch (error) {
        console.error('Veri okuma hatası:', error);
      }
    };

    fetchData();
  }, []); // Bu useEffect sadece bir kere çalışacak şekilde ayarlanmıştır.

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleStartTimeSelection = async date => {
    setSelectedStartTime(date);
    hideStartTimePicker();

    try {
      await AsyncStorage.setItem(START_TIME_KEY, date.toString());
    } catch (error) {
      console.error('Başlama saati kaydetme hatası:', error);
    }
  };

  const handleEndTimeSelection = async date => {
    setSelectedEndTime(date);
    hideEndTimePicker();

    try {
      await AsyncStorage.setItem(END_TIME_KEY, date.toString());
    } catch (error) {
      console.error('Bitiş saati kaydetme hatası:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
          padding: 10,
        }}>
        <Image
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            resizeMode: 'contain',
          }}
          source={require('../assets/location.jpg')}
        />
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Seyahate başlama saatini seç
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f7fc',
                borderRadius: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#428bf8',
              }}
              onPress={showStartTimePicker}>
              <Text style={{color: 'black', fontSize: 20, marginVertical: 10}}>
                {selectedStartTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Seyahatin bitiş saatini seç
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f7fc',
                borderRadius: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#428bf8',
              }}
              onPress={showEndTimePicker}>
              <Text style={{color: 'black', fontSize: 20, marginVertical: 10}}>
                {selectedEndTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>
          {isStartTimePickerVisible && (
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeSelection}
              onCancel={hideStartTimePicker}
            />
          )}
          {isEndTimePickerVisible && (
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeSelection}
              onCancel={hideEndTimePicker}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Place')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            marginHorizontal: 30,
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Next
          </Text>
          <View
            style={{
              padding: 10,
              borderRadius: 25,
              backgroundColor: 'black',
            }}>
            <Icon name="right" fill="white" size={24} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PlanningScreen;
