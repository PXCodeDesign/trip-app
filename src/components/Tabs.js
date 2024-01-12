import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import HomeScreen from '../screen/home';
import AboutScreen from '../screen/about';
import CreateTripScreen from '../screen/createTrip';
import {Icon} from '../Icon';
import {StackNavigator} from '../App.tsx';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Icon name="home" size={36} fill={focused ? 'blue' : 'black'} />
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 12,
                  fontWeight: '400',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                position: 'absolute',
                bottom: 35,
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 12,
                backgroundColor: 'blue',
                borderRadius: 30,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Create Trip
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Icon name="about" size={36} fill={focused ? 'blue' : 'black'} />
              <Text
                style={{
                  color: focused ? 'blue' : 'black',
                  fontSize: 12,
                  fontWeight: '400',
                }}>
                About
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Tabs;
