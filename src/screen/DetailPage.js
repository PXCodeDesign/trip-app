import {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import API_KEY from '../key';
import {Icon} from '../Icon';

const GalleryContent = () => <Text>Gallery Content</Text>;

function DetailPage(props) {
  const {item} = props.route.params;
  const [placeDetails, setPlaceDetails] = useState(null);
  const [activeContent, setActiveContent] = useState('description');

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=${API_KEY}`,
        );

        const data = await response.json();

        if (data.result) {
          setPlaceDetails(data.result);
        } else {
          console.warn('Yer detayları bulunamadı');
        }
      } catch (error) {
        console.error('Yer detaylarını alma hatası:', error);
      }
    };

    fetchPlaceDetails();
  }, [item.place_id]);

  const renderContent = () => {
    switch (activeContent) {
      case 'description':
        return (
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'white',
              marginHorizontal: 20,
              padding: 10,
              marginTop: 10,
              borderRadius: 10,
            }}>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
              Address: {placeDetails?.formatted_address}
            </Text>
            <Text style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
              Phone:{placeDetails?.formatted_phone_number}
            </Text>
          </View>
        );
      case 'gallery':
        return <GalleryContent />;
      case 'reviews':
        return (
          <FlatList
            style={{
              flexDirection: 'column',
              marginTop: 5,
            }}
            keyExtractor={placeDetails => placeDetails.place_id}
            data={placeDetails.reviews}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: 'white',
                  marginHorizontal: 20,
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 5,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: 5,
                }}>
                <View>
                  <Image
                    source={{
                      uri: item.profile_photo_url,
                    }}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
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
                </View>
                <View style={{width: '90%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 10,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
                      {item?.author_name}
                    </Text>
                    <Text
                      style={{color: 'grey', fontSize: 12, fontWeight: '400'}}>
                      {item?.relative_time_description}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={5}
                    style={{color: 'black', fontSize: 12, fontWeight: '300'}}>
                    {item.text}
                  </Text>
                </View>
              </View>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {item.photos && item.photos.length > 0 && (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=${API_KEY}`,
            }}
            style={{
              width: '100%',
              height: '95%',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
            resizeMode="cover"
          />
        )}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            width: '90%',
            height: 120,
            position: 'absolute',
            bottom: -20,
            marginHorizontal: 20,
            elevation: 15, // Android için gölge
            shadowColor: '#ababab', // iOS için gölge
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.1,
            shadowRadius: 10,
            overflow: 'hidden',
            padding: 20,
          }}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
            {placeDetails?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
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
              {placeDetails?.user_ratings_total}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
            gap: 10,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveContent('description')}>
            <Text
              style={[
                styles.buttonText,
                activeContent === 'description' && styles.activeText,
              ]}>
              Description
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveContent('gallery')}>
            <Text
              style={[
                styles.buttonText,
                activeContent === 'gallery' && styles.activeText,
              ]}>
              Gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveContent('reviews')}>
            <Text
              style={[
                styles.buttonText,
                activeContent === 'reviews' && styles.activeText,
              ]}>
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#efefef'},
  button: {flex: 1, justifyContent: 'center'},
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  activeText: {
    color: 'blue',
  },
});
export default DetailPage;
