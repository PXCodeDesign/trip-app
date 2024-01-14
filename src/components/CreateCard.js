import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from '../Icon';
import {useState} from 'react';
import CreateCardModal from './CreateCardModal';

function CreateCard() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View
      style={{
        height: 100,
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10, // Android için gölge
        shadowColor: '#000', // iOS için gölge
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <CreateCardModal
        close={closeModal}
        open={openModal}
        modalVisible={modalVisible}
      />
      <View style={{justifyContent: 'center', padding: 20}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: 'black',
            marginBottom: 4,
          }}>
          İstanbul Trip
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
            marginBottom: 4,
          }}>
          İstanbul
        </Text>
        <Text style={{fontSize: 12, fontWeight: '500', color: 'grey'}}>
          Ocak 20 - Ocak 23
        </Text>
      </View>
      <TouchableOpacity style={{padding: 10}} onPress={openModal}>
        <Icon name="more" size={32} fill="black" />
      </TouchableOpacity>
    </View>
  );
}
export default CreateCard;
