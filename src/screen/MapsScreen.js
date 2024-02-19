import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_KEY from '../key';

function MapsScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    startRoute();
  }, []);

  const calculateOptimalRoute = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('startLocation');
      const storedCity = await AsyncStorage.getItem('selectedCity');

      if (storedLocation && storedCity) {
        const startLocation = JSON.parse(storedLocation);
        setUserLocation(startLocation);

        const endLocation = {...startLocation};
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 8 * 60 * 60 * 1000);

        const cityInfo = await fetchCityInfo(
          storedCity,
          startLocation.latitude,
          startLocation.longitude,
          endTime,
        );

        if (cityInfo && cityInfo.results && cityInfo.results.length > 0) {
          const result = cityInfo.results[0];
          const location = result.geometry?.location;

          if (location && location.lat && location.lng) {
            const destination = {
              latitude: location.lat,
              longitude: location.lng,
            };

            const waypoints = [
              `${startLocation.latitude},${startLocation.longitude}`,
              `${endLocation.latitude},${endLocation.longitude}`,
            ];

            const directionsCoordinates = await getDirections(
              `${startLocation.latitude},${startLocation.longitude}`,
              `${destination.latitude},${destination.longitude}`,
              waypoints,
            );

            if (directionsCoordinates) {
              setRouteCoordinates([directionsCoordinates]);
            }
          } else {
            console.warn('Gezilecek yer bulunamadı.');
          }
        } else {
          console.warn('Gezilecek yer bulunamadı.');
        }
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const fetchCityInfo = async (storedCity, latitude, longitude, endTime) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${storedCity}&location=${latitude},${longitude}&radius=5000&key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.error('City info API request failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching city info:', error);
      return null;
    }
  };

  const getDirections = async (origin, destination, waypoints) => {
    console.log('Waypoints:', waypoints);
    try {
      if (!waypoints || waypoints.length === 0) {
        console.error('Waypoints array is empty or undefined.');
        return null;
      }
      const waypointString = waypoints.join('|');
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypointString}&key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        if (data.status === 'OK') {
          setRouteCoordinates([data]); // Rota koordinatlarını güncelle
          return data;
        } else {
          console.error('Directions API response:', data);
        }
      } else {
        console.error('Directions API request failed:', data);
      }

      setRouteCoordinates([]); // Rota bulunamazsa boş bir dizi kullanın
      return null;
    } catch (error) {
      console.error('Error fetching directions:', error);
      setRouteCoordinates([]); // Hata durumunda boş bir dizi kullanın
      return null;
    }
  };

  const startRoute = async () => {
    try {
      const startLocationString = await AsyncStorage.getItem('startLocation');
      const startLocation = JSON.parse(startLocationString);

      if (startLocation) {
        setUserLocation(startLocation);
        await fetchPlaces(
          startLocation.latitude,
          startLocation.longitude,
          startLocation,
        );
        await calculateOptimalRoute();
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const handlePlacePress = async selectedPlace => {
    console.log('Selected Place:', selectedPlace);

    if (
      selectedPlace &&
      selectedPlace.geometry &&
      selectedPlace.geometry.location
    ) {
      const destination = `${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}`;

      if (userLocation && userLocation.latitude !== undefined) {
        const startLocation = `${userLocation.latitude},${userLocation.longitude}`;
        const waypoints = [startLocation, destination];

        const directionsCoordinates = await getDirections(
          startLocation,
          destination,
          waypoints,
        );

        if (directionsCoordinates) {
          setRouteCoordinates([directionsCoordinates]);
        }
      } else {
        console.warn('Invalid user location:', userLocation);
      }
    } else {
      console.error('Invalid selected place:', selectedPlace);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.placeContainer}
      onPress={() => handlePlacePress(item)}>
      {item.photos && item.photos.length > 0 ? (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0]?.photo_reference}&key=${API_KEY}`,
          }}
          style={styles.placeImage}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={require('../assets/no_images.jpg')}
          style={styles.placeImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchPlaces = async (lat, lng, startLocation) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=museum&key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setPlaces([startLocation, ...data.results]);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
        region={{
          latitude: userLocation?.latitude || 0,
          longitude: userLocation?.longitude || 0,
          latitudeDelta: 0.1, // Örnek değer, ihtiyaca göre ayarlayabilirsiniz
          longitudeDelta: 0.1,
        }}>
        {places.map((place, index) => {
          if (place && place.geometry) {
            const location = place.geometry.location;
            if (location && location.lat && location.lng) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location.lat,
                    longitude: location.lng,
                  }}>
                  <Callout>
                    <Text>{place.name}</Text>
                  </Callout>
                </Marker>
              );
            }
          }
          return null;
        })}
        {routeCoordinates.length > 0 &&
          routeCoordinates.map((coordinates, index) => (
            <MapViewDirections
              key={index}
              origin={{
                latitude: userLocation?.latitude || 0,
                longitude: userLocation?.longitude || 0,
              }}
              destination={{
                latitude: coordinates[coordinates.length - 1]?.latitude || 0,
                longitude: coordinates[coordinates.length - 1]?.longitude || 0,
              }}
              waypoints={
                Array.isArray(coordinates) ? coordinates.slice(0, -1) : []
              }
              apikey={API_KEY}
              strokeWidth={13}
              strokeColor="#00adc6"
            />
          ))}
      </MapView>
      <View style={styles.bottomContainer}>
        <FlatList
          horizontal
          style={styles.placesList}
          data={places}
          renderItem={renderItem}
          keyExtractor={item => item.place_id}
          extraData={routeCoordinates}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
  },
  placesList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  placeContainer: {
    height: 275,
    width: 275,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: '70%',
  },
  placeDetails: {
    backgroundColor: 'white',
    padding: 10,
  },
  placeName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
  },
});

export default MapsScreen;
