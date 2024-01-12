import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {Icon} from '../Icon';

function ItineraryScreen() {
  const navigation = useNavigation();

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
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: '500',
              marginVertical: 5,
            }}>
            Seyahatinizi görmeye hazırmısınız, yoksa biraz daha özelleştirmek
            itermisiniz?
          </Text>
        </View>

        <View style={{marginTop: 100}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Place')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
              backgroundColor: '#efefef',
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
          <TouchableOpacity
            onPress={() => navigation.navigate('ChoosePlace')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginBottom: 10,
              backgroundColor: '#efefef',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Belirli yerleri seç
            </Text>
            <Icon name="locationAdd" fill="black" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ItineraryScreen;
