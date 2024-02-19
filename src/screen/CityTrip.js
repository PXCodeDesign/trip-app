import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../Icon';

function CityTripScreen() {
  const navigation = useNavigation();
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
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: 'black',
              textAlign: 'center',
            }}>
            İstanbul Seyahatin
          </Text>
        </View>
        <View style={{gap: 10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PlaceToVisit')}
            style={{
              backgroundColor: '#1e1d2e',
              borderRadius: 15,
              marginHorizontal: 20,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              elevation: 6,
              shadowRadius: 2,
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
            }}>
            <View style={{padding: 10}}>
              <Icon name="heart" fill="#ff7576" size={32} />
            </View>
            <View style={{width: '85%'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                Ziyaret Edilecek Yerler
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                Özel olarak seçilmiş ve tercihlerinize en uygun yerler.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MapsScreen')}
            style={{
              backgroundColor: '#1e1d2e',
              borderRadius: 15,
              marginHorizontal: 20,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              elevation: 6,
              shadowRadius: 2,
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
            }}>
            <View style={{padding: 10}}>
              <Icon name="location" fill="#67ffb4" size={32} />
            </View>
            <View style={{width: '85%'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                Günlük Haritalar
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                Optimize edilmiş rotalar ve kolay navigasyon
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Schedule')}
            style={{
              backgroundColor: '#1e1d2e',
              borderRadius: 15,
              marginHorizontal: 20,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              elevation: 6,
              shadowRadius: 2,
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.5,
            }}>
            <View style={{padding: 10}}>
              <Icon name="calendar" fill="#85afff" size={32} />
            </View>
            <View style={{width: '85%'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '500',
                }}>
                Program
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                Yanlızca bir referans, böylece istediğiniz kadar görebilirsiniz.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CityTripScreen;
