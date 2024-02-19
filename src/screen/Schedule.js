import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_KEY from '../key';

function ScheduleScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [flatListData, setFlatListData] = useState([]);
  const [shownMuseums, setShownMuseums] = useState(5);
  const [selectedCity, setSelectedCity] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [museumsToShow, setMuseumsToShow] = useState(5);

  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      try {
        const storedDateRange = await AsyncStorage.getItem('selectedDateRange');
        const {startDate, endDate} = JSON.parse(storedDateRange);

        const storedWeek = getWeekDays(startDate, endDate);
        setCurrentWeek(storedWeek);

        const cityInfoString = await AsyncStorage.getItem('selectedCity');
        const cityInfo = JSON.parse(cityInfoString);
        setSelectedCity(cityInfo);

        const contentForSelectedDate = await fetchContentForDate(
          startDate,
          cityInfo,
        );

        // Eğer contentData undefined ise boş bir dizi ile başlat
        setContentData(prevData => prevData || []);

        setFlatListData(storedWeek);
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    fetchDataFromLocalStorage();
  }, []);

  const getWeekDays = (startDate, endDate) => {
    const weekDays = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (
      let current = start;
      current <= end;
      current.setDate(current.getDate() + 1)
    ) {
      const dayShort = current.toLocaleDateString('tr-TR', {
        weekday: 'short',
        day: 'numeric',
      });

      const dayShortParts = dayShort.split(' ');

      weekDays.push({
        id: current.toISOString(),
        dayShort: dayShortParts[0],
        day: dayShortParts[1],
      });
    }
    return weekDays;
  };

  const fetchContentForDate = async (selectedDate, city) => {
    try {
      console.log('fetchContentForDate - Başlangıç');
      if (city.location) {
        const {latitude, longitude} = city.location;

        const placesResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=museum&key=${API_KEY}`,
        );

        const placesData = await placesResponse.json();

        if (placesData.results && placesData.results.length > 0) {
          const sortedPlaces = placesData.results.sort(
            (a, b) => b.rating - a.rating,
          );

          const museumsForDate = sortedPlaces.slice(0, 5).map(place => ({
            name: place.name,
            rating: place.rating,
            vicinity: place.vicinity,
          }));

          console.log('fetchContentForDate - Müzeler:', museumsForDate);

          setContentData(prevData => {
            return {
              ...prevData,
              [selectedDate]: museumsForDate,
            };
          });
        } else {
          setContentData(prevData => {
            return {
              ...prevData,
              [selectedDate]: [],
            };
          });
        }
      }
      console.log('fetchContentForDate - Bitiş');
    } catch (error) {
      console.error('İçerik alınamadı:', error);
      console.error('fetchContentForDate - Hata:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        paddingHorizontal: 20,
      }}
      onPress={() => handleDateSelection(item.dayShort)}>
      <Text
        style={{
          color: selectedDate === item.dayShort ? 'white' : '#ababab',
          fontSize: 16,
          fontWeight: '500',
        }}>
        {item.day}
      </Text>
      <Text
        style={{
          color: selectedDate === item.dayShort ? 'white' : '#ababab',
          fontSize: 36,
          fontWeight: '700',
        }}>
        {item.dayShort}
      </Text>
    </TouchableOpacity>
  );

  const renderMuseums = () => {
    const museumData = contentData;

    if (!museumData || !museumData.museums || museumData.museums.length === 0) {
      return (
        <Text style={{fontSize: 16, marginTop: 20}}>
          Seçilen tarih için müze bilgisi bulunmamaktadır.
        </Text>
      );
    }

    console.log('Museum Data:', museumData.museums);

    const slicedMuseums = museumData.museums.slice(0, museumsToShow);

    return (
      <View>
        <FlatList
          data={slicedMuseums}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => (
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10}}>
                {`${item.name} - Rating: ${item.rating} - Address: ${item.vicinity}`}
              </Text>
            </View>
          )}
        />
        {museumData.museums.length > museumsToShow && (
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              padding: 10,
              marginTop: 10,
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => setMuseumsToShow(prev => prev + 5)}>
            <Text style={{color: 'white'}}>Daha Fazla Müze Göster</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleDateSelection = async date => {
    try {
      await AsyncStorage.setItem('selectedDate', date);
      setSelectedDate(date);

      // Eğer seçilen tarih `contentData` içinde yoksa yeni veri çek
      if (!contentData.some(data => data.date === date)) {
        const contentForSelectedDate = await fetchContentForDate(
          date,
          selectedCity,
        );
        setContentData(prevData => [
          ...prevData,
          {date, museums: contentForSelectedDate},
        ]);
      }
    } catch (error) {
      console.error('handleDateSelection - Hata:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{marginTop: 50, marginBottom: 10, marginHorizontal: 20}}>
        <FlatList
          data={flatListData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flex: 1,
        }}>
        <View style={{padding: 20}}>{renderMuseums()}</View>
      </View>
    </View>
  );
}

export default ScheduleScreen;
