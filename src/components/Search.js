import {StyleSheet, TextInput, View} from 'react-native';
import {Icon} from '../Icon';

function Search() {
  return (
    <View style={styles.container}>
      <Icon name="search" size={28} />
      <TextInput style={styles.textInput} placeholder="Search.." />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4, // Android için shadow
    shadowColor: 'black', // iOS için shadow rengi
    shadowOffset: {width: 0, height: 2}, // iOS için shadow offset
    shadowOpacity: 0.5, // iOS için shadow opasite
    shadowRadius: 2,
  },
  textInput: {
    height: 45,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 5,
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default Search;
