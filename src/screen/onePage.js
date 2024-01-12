import {StyleSheet, Text, TextInput, View} from 'react-native';
import Dates from '../components/Dates';

function OnePage() {
  return (
    <View>
      <View>
        <Text style={styles.text}>Hangi şehre gitmek istiyorsunuz?</Text>
        <TextInput style={styles.input} placeholder="City" />
      </View>
      <Dates />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  input: {
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 50,
    borderWidth: 1,
    borderColor: 'orange',
    fontSize: 18,
  },
});
export default OnePage;
