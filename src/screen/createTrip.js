import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import debounce from 'lodash.debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '../Icon';
import API_KEY from '../key';

function CreateTripScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);
  const [showFlatList, setShowFlatList] = useState(true);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = date => {
    const formattedDate = date.toISOString().split('T')[0];
    setStartDate(formattedDate);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = date => {
    const formattedDate = date.toISOString().split('T')[0];
    setEndDate(formattedDate);
    hideEndDatePicker();
  };

  const saveDateRange = async () => {
    // Check if both start and end dates are selected and end date is after or equal to start date
    if (startDate && endDate && new Date(endDate) >= new Date(startDate)) {
      const dateRange = {startDate, endDate};
      await AsyncStorage.setItem(
        'selectedDateRange',
        JSON.stringify(dateRange),
      );
      navigation.navigate('Planning');
    } else {
      // Show an error message or handle the case where selection is invalid
      console.error('Invalid date selection. Please check your dates.');
    }
  };

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

  const handlePlaceSelect = async selectedPlace => {
    setSearch(selectedPlace.name);
    setShowFlatList(false);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${selectedPlace.place_id}&fields=geometry&key=${API_KEY}`,
      );

      const json = await response.json();
      if (
        json.result &&
        json.result.geometry &&
        json.result.geometry.location
      ) {
        const location = json.result.geometry.location;
        const cityInfo = {
          name: selectedPlace.name,
          location: {
            latitude: location.lat,
            longitude: location.lng,
          },
        };

        // Seçilen şehir bilgilerini local storage'a kaydet
        await AsyncStorage.setItem('selectedCity', JSON.stringify(cityInfo));
      }
    } catch (error) {
      console.error('Şehir koordinatları alma hatası:', error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20,
        }}>
        <Image
          style={{
            width: '100%',
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
        <View style={{zIndex: 0}}>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Hangi şehri ziyaret etmek istersin?
            </Text>
            <View
              style={{
                backgroundColor: '#f5f7fc',
                borderRadius: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#428bf8',
              }}>
              <Icon fill={null} name="search" size={20} />
              <TextInput
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                  width: '95%',
                }}
                placeholder="City"
                value={search}
                onChangeText={text => {
                  setSearch(text);
                  if (text.length > 2) {
                    handleSearch(text);
                    setShowFlatList(true); // TextInput'e yazıldığında FlatList'i göster
                  }
                }}
              />
            </View>
            {showFlatList && (
              <FlatList
                data={places}
                keyExtractor={item => item.place_id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ddd',
                    }}
                    onPress={() => handlePlaceSelect(item)}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: '400',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  backgroundColor: '#cfcfcf',
                }}
              />
            )}
          </View>
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Aklındaki tarih aralığı nedir?
            </Text>
            {/* Start Date */}
            <TouchableOpacity
              onPress={showStartDatePicker}
              style={{
                backgroundColor: '#f5f7fc',
                borderRadius: 10,
                gap: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#428bf8',
              }}>
              <Icon fill="black" name="calendar" size={20} />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                {startDate ? `Start: ${startDate}` : 'Select Start Date'}
              </Text>
            </TouchableOpacity>

            {/* End Date */}
            <TouchableOpacity
              onPress={showEndDatePicker}
              style={{
                backgroundColor: '#f5f7fc',
                borderRadius: 10,
                paddingVertical: 10,
                gap: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#428bf8',
                marginTop: 10,
              }}>
              <Icon fill="black" name="calendar" size={20} />
              <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>
                {endDate ? `End: ${endDate}` : 'Select End Date'}
              </Text>
            </TouchableOpacity>

            {/* Date Picker Modals */}
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
            />
          </View>
        </View>

        <TouchableOpacity
          disabled={
            !startDate || !endDate || new Date(endDate) < new Date(startDate)
          }
          onPress={saveDateRange}
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

export default CreateTripScreen;
