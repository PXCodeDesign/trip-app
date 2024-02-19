import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_KEY from '../key';

function MapsScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([startLocationMarker]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
          const waypoints = cityInfo.results.map(place => ({
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          }));

          waypoints.push(endLocation);

          const directionsCoordinates = await getDirections(
            `${startLocation.latitude},${startLocation.longitude}`,
            `${endLocation.latitude},${endLocation.longitude}`,
            waypoints,
          );

          if (directionsCoordinates) {
            setRouteCoordinates([directionsCoordinates]);
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
    try {
      const waypointString = waypoints
        .map(coord => `${coord.latitude},${coord.longitude}`)
        .join('|');
      const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypointString}&key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.error('Directions API request failed:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
      return null;
    }
  };

  const startRoute = async () => {
    try {
      const startLocationString = await AsyncStorage.getItem('startLocation');
      const startLocation = JSON.parse(startLocationString);

      if (startLocation) {
        setUserLocation(startLocation);
        await fetchPlaces(startLocation.latitude, startLocation.longitude);
        await calculateOptimalRoute(); // Optimal rotayı hesapla
      }
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  useEffect(() => {
    startRoute();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchPlaces(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  const fetchPlaces = async (lat, lng) => {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=museum&key=${API_KEY}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setPlaces(data.results);
      } else {
        console.error('Places API request failed:', data);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const startLocationMarker = {
    place_id: userLocation?.place_id,
    name: userLocation?.name,
    lat: userLocation?.latitude,
    lng: userLocation?.longitude,
  };
  console.log(startLocationMarker);
  const renderItem = ({item}) => (
    <View
      style={styles.placeContainer}
      onTouchEnd={() => handlePlacePress(item)}>
      <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0]?.photo_reference}&key=${API_KEY}`,
        }}
        style={styles.placeImage}
        resizeMode="cover"
      />
      <View style={styles.placeDetails}>
        <Text style={styles.placeName}>{item.name}</Text>
      </View>
    </View>
  );

  const handlePlacePress = async selectedPlace => {
    const destination = `${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}`;

    if (userLocation && userLocation.latitude !== undefined) {
      const directionsCoordinates = await getDirections(
        `${userLocation.latitude},${userLocation.longitude}`,
        destination,
      );

      if (directionsCoordinates) {
        setRouteCoordinates([directionsCoordinates]);
      }
    } else {
      console.warn('Invalid user location:', userLocation);
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {places.map((place, index) => {
          console.log(place); // place nesnesini konsola yazdır
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
              origin={userLocation || {latitude: 0, longitude: 0}}
              destination={{
                latitude: coordinates[coordinates.length - 1]?.latitude || 0,
                longitude: coordinates[coordinates.length - 1]?.longitude || 0,
              }}
              waypoints={
                Array.isArray(coordinates) ? coordinates.slice(0, -1) : []
              }
              apikey={API_KEY}
              strokeWidth={3}
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
          keyExtractor={item =>
            item.place_id ? item.place_id.toString() : item.name
          }
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
