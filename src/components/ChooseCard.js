import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {Icon} from '../Icon';
import API_KEY from '../key';

function ChooseCard({item}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailPage', {item})}>
      <View
        style={{
          backgroundColor: 'white',
          height: 120,
          borderRadius: 10,
          elevation: 6, // Android için shadow
          shadowColor: 'black', // iOS için shadow rengi
          shadowOffset: {width: 0, height: 2}, // iOS için shadow offset
          shadowOpacity: 0.5, // iOS için shadow opasite
          shadowRadius: 2,
          flexDirection: 'row',
          marginBottom: 10,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailPage', {item})}
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            padding: 2,
            right: 10,
            top: 10,
            borderRadius: 25,
          }}>
          <Icon name="add" fill="white" size={24} />
        </TouchableOpacity>

        {item.photos && item.photos.length > 0 && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}`,
            }}
            style={{width: '33%', height: 120, borderRadius: 10}}
            resizeMode="cover"
          />
        )}
        <View
          style={{
            padding: 10,
            flex: 2,
          }}>
          <Text style={{color: 'black', fontSize: 14, fontWeight: '500'}}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#efefef',
                padding: 4,
                borderRadius: 3,
                marginRight: 5,
                marginVertical: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '400',
                  marginRight: 4,
                }}>
                {item.rating}
              </Text>
              <Icon name="star" fill="orange" size={14} />
            </View>
            <Text
              style={{
                color: 'green',
                fontSize: 12,
                fontWeight: '400',
                backgroundColor: '#efefef',
                padding: 4,
                borderRadius: 3,
                marginVertical: 4,
              }}>
              {item.user_ratings_total}
            </Text>
          </View>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              color: 'black',
              fontSize: 12,
              fontWeight: '400',
              marginTop: 4,
            }}>
            {item.vicinity}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChooseCard;
