import React, {useState} from 'react';
import {
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '../Icon';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function PlanningScreen() {
  const navigation = useNavigation();

  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

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

  const handleStartTimeSelection = date => {
    setSelectedStartTime(date);
    hideStartTimePicker();
  };

  const handleEndTimeSelection = date => {
    setSelectedEndTime(date);
    hideEndTimePicker();
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
          source={require('../assets/trip2.png')}
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
                backgroundColor: '#efefef',
                borderRadius: 5,
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
                backgroundColor: '#efefef',
                borderRadius: 5,
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
