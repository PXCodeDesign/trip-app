import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import API_KEY from '../key';

const AddLocationScreen = () => {
  const navigation = useNavigation();
  const [searchLocation, setSearchLocation] = useState('');
  const [startLocation, setStartLocation] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    getStoredStartLocationAndCity();
  }, []);

  const getStoredStartLocationAndCity = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('startLocation');
      const storedCity = await AsyncStorage.getItem('selectedCity');

      if (storedLocation) {
        const parsedLocation = JSON.parse(storedLocation);
        setStartLocation(parsedLocation);
      }

      if (storedCity) {
        const parsedCity = JSON.parse(storedCity);
        setSelectedCity(parsedCity);
      }
    } catch (error) {
      console.error('Başlangıç konumu veya şehir bilgisi alınamadı:', error);
    }
  };

  const handleSearch = async searchText => {
    setSearchLocation(searchText);
    if (searchText.length > 2) {
      fetchAccommodations(searchText);
    } else {
      setAccommodations([]); // Eğer kelime uzunluğu 2'den küçükse boşalt
    }
  };

  const fetchAccommodations = async searchText => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
          searchText,
        )}&key=${API_KEY}`,
      );

      const data = await response.json();
      if (data.results) {
        setAccommodations(data.results);
      }
    } catch (error) {
      console.error('Konaklama yerleri getirilemedi:', error);
    }
  };

  const handleSelectAccommodation = async selectedPlace => {
    setSearchLocation(selectedPlace.name);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedPlace.place_id}&fields=name,geometry&key=${API_KEY}`,
      );

      const data = await response.json();
      if (
        data.result &&
        data.result.geometry &&
        data.result.geometry.location
      ) {
        const location = data.result.geometry.location;
        const accommodationLocation = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          place_id: selectedPlace.place_id, // id bilgisini sakla
          name: selectedPlace.name, // name bilgisini sakla
        };

        // Seçilen konaklama yerinin koordinatlarını başlangıç konumu olarak ayarla
        setStartLocation(accommodationLocation);

        // Seçilen konaklama yerini AsyncStorage'e kaydet
        const selectedAccommodation = {
          id: accommodationLocation.id,
          name: accommodationLocation.name,
          location: accommodationLocation,
        };
        await AsyncStorage.setItem(
          'selectedAccommodation',
          JSON.stringify(selectedAccommodation),
        );

        // FlatList'i kapat
        setAccommodations([]);
      }
    } catch (error) {
      console.error('Konaklama yeri koordinatları alınamadı:', error);
    }
  };
  const handleAddAccommodation = async () => {
    if (startLocation) {
      try {
        await AsyncStorage.setItem(
          'startLocation',
          JSON.stringify(startLocation),
        );
        await AsyncStorage.setItem(
          'selectedAccommodation',
          JSON.stringify({
            id: startLocation.place_id,
            name: startLocation.name,
            location: startLocation,
          }),
        );
        navigation.navigate('Itinerary');
      } catch (error) {
        console.error('Veriler kaydedilemedi:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {startLocation &&
        (console.log(startLocation),
        (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: startLocation.latitude,
              longitude: startLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={startLocation}
              title={startLocation.name}
              // Başlık olarak name kullan
            />
          </MapView>
        ))}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Konaklama yeri ara..."
          value={searchLocation}
          onChangeText={text => handleSearch(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
          <Text style={styles.searchButtonText}>Ara</Text>
        </TouchableOpacity>
      </View>

      {accommodations.length > 0 && (
        <View style={styles.accommodationList}>
          <FlatList
            data={accommodations}
            keyExtractor={item => item.place_id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.accommodationItem}
                onPress={() => handleSelectAccommodation(item)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <TouchableOpacity
        onPress={handleAddAccommodation}
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          width: '90%',
          alignItems: 'center',
          borderRadius: 10,
          marginHorizontal: 20,
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
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  accommodationList: {
    height: 200,
  },
  accommodationItem: {
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default AddLocationScreen;
