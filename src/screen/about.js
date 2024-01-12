import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import debounce from 'lodash.debounce';
import API_KEY from '../key';

function AboutScreen() {
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleSearch = searchText => {
    setSearch(searchText);
    debouncedSearch(searchText);
  };
  const debouncedSearch = debounce(searchText => {
    fetchPlaces(searchText, setPlaces);
  }, 800);

  const handlePlaceSelect = async place => {
    const destinationLoc = `${place.geometry.location.lat},${place.geometry.location.lng}`;
    const userLocation = '37.7749,-122.4194';
    const routeCoordinates = await getRoute(userLocation, destinationLoc);
    setRoute(routeCoordinates);
  };

  const fetchPlaces = async (searchText, setPlaces) => {
    if (searchText.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            searchText,
          )}&key=${API_KEY}`,
        );

        const json = await response.json();
        if (json.results) {
          setPlaces(json.results);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  async function searchPlaces(city) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${city}&key=${API_KEY}`,
      );
      const json = await response.json();
      return json.results;
    } catch (error) {
      console.error(error);
    }
  }
  async function getRoute(startLoc, destinationLoc) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${API_KEY}`,
      );
      const json = await response.json();
      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const routeCoordinates = points.map(point => ({
        latitude: point[0],
        longitude: point[1],
      }));
      return routeCoordinates;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Polyline coordinates={route} strokeWidth={2} strokeColor="red" />
      </MapView>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a place"
        value={search}
        onChangeText={text => {
          setSearch(text);
          if (text.length > 2) {
            handleSearch(text);
          }
        }}
      />
      <FlatList
        data={places}
        keyExtractor={item => item.place_id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePlaceSelect(item)}>
            <Text style={styles.placeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBar: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },

  list: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  placeName: {
    fontSize: 18,
  },
});

export default AboutScreen;
