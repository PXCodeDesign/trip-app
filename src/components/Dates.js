import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {getFormatedDate} from 'react-native-modern-datepicker';

function Dates() {
  const today = new Date();
  const startDate = getFormatedDate(today, 'YYYY/MM/DD');
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: startDate,
    end: getFormatedDate(today.setDate(today.getDate() + 2), 'YYYY/MM/DD'),
  });

  function handleOnPress() {
    setOpen(!open);
  }

  function handleRangeChange(range) {
    setDateRange({
      start: getFormatedDate(new Date(range[0]), 'YYYY/MM/DD'),
      end: getFormatedDate(new Date(range[1]), 'YYYY/MM/DD'),
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Open</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="range"
              minimumDate={startDate}
              selected={[dateRange.start, dateRange.end]}
              onRangeDateChange={handleRangeChange}
            />

            <TouchableOpacity onPress={handleOnPress}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Dates;
