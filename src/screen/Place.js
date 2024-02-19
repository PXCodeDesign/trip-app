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

function PlaceScreen() {
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
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: '500',
              marginVertical: 5,
            }}>
            Kalacak yerin var mı?
          </Text>
        </View>

        <View style={{marginTop: 100, gap: 4}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddLocation')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: '#1e1d2e',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Konaklama Ekle
            </Text>
            <Icon name="locationTick" fill="white" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Itinerary')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: '#1e1d2e',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Daha Sonra Ekle
            </Text>
            <Icon name="safeHome" fill="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PlaceScreen;
