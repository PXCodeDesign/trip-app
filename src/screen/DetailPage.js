import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
const DescriptionContent = () => <Text>Description Content</Text>;
const GalleryContent = () => <Text>Gallery Content</Text>;
const ReviewsContent = () => <Text>Reviews Content</Text>;

function DetailPage(props) {
  const {item} = props.route.params;
  const [activeContent, setActiveContent] = useState('description');

  const renderContent = () => {
    switch (activeContent) {
      case 'description':
        return <DescriptionContent />;
      case 'gallery':
        return <GalleryContent />;
      case 'reviews':
        return <ReviewsContent />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: '100%',
            height: '78%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
          source={{uri: item.uri}}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 30,
            width: '90%',
            height: 120,
            position: 'absolute',
            bottom: 50,
            marginHorizontal: 20,
            elevation: 15, // Android için gölge
            shadowColor: '#ababab', // iOS için gölge
            shadowOffset: {width: 0, height: 10},
            shadowOpacity: 0.1,
            shadowRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: 'black',
              marginHorizontal: 30,
              marginVertical: 30,
            }}>
            {item.title}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setActiveContent('description')}>
            <Text
              style={[
                styles.buttonText,
                activeContent === 'description' && styles.activeText,
              ]}>
              Place Description
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
  container: {},
  button: {paddingHorizontal: 10},
  buttonText: {
    color: '#ababab',
    marginRight: 30,
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: 'blue',
  },
});
export default DetailPage;
