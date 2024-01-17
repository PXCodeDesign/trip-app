import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import API_KEY from '../key';

function MapsScreen() {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [route, setRoute] = useState([]);

  const fetchData = async () => {
    try {
      // AsyncStorage'ten seçilen şehir bilgisini al
      const cityInfoString = await AsyncStorage.getItem('selectedCity');
      const cityInfo = JSON.parse(cityInfoString);

      setSelectedCity(cityInfo.name);

      // Şehir adını kullanarak koordinatları al
      const cityCoordinatesResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${cityInfo.name}&key=${API_KEY}`,
      );
      const cityCoordinatesData = await cityCoordinatesResponse.json();

      if (
        cityCoordinatesData.results &&
        cityCoordinatesData.results.length > 0
      ) {
        const {lat, lng} = cityCoordinatesData.results[0].geometry.location;

        // Gezilecek yerleri almak için bu koordinatları kullan
        const placesResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=museum&key=${API_KEY}`,
        );

        const placesData = await placesResponse.json();

        if (placesData.results && placesData.results.length > 0) {
          const placesSlice = placesData.results.slice(0, 5);

          setPlaces(placesSlice);

          const routeCoordinates = placesSlice.map(place => ({
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }));

          setRoute(routeCoordinates);
        } else {
          console.warn('Gezilecek yer bulunamadı');
        }
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCity]);

  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: route.length > 0 ? route[0].latitude : 0,
          longitude: route.length > 0 ? route[0].longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            pinColor="green"
          />
        ))}
        {route.length > 1 && (
          <MapViewDirections
            origin={route[0]}
            waypoints={route.slice(1, -1)}
            destination={route[route.length - 1]}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapsScreen;
