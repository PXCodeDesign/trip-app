import {Modal, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from '../Icon';

function CreateCardModal({open, close, modalVisible}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={close}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: '100%',
            padding: 20,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              marginBottom: 5,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '400',
                marginHorizontal: 5,
              }}>
              Trip
            </Text>
            <TouchableOpacity style={{}} onPress={close}>
              <Icon name="close" size={36} fill="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 100,
              backgroundColor: '#efefef',
              borderRadius: 10,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              gap: 10,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={close}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                  backgroundColor: '#efefef',
                  padding: 10,
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={close}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                  backgroundColor: '#efefef',
                  padding: 10,
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              onPress={close}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                  backgroundColor: '#efefef',
                  padding: 10,
                  borderRadius: 10,
                  textAlign: 'center',
                }}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default CreateCardModal;
