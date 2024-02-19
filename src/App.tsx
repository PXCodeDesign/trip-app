import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/home';
import DetailPage from './screen/DetailPage';
import {Icon} from './Icon';
import CreateTripScreen from './screen/createTrip';
import AboutScreen from './screen/about';
import PlanningScreen from './screen/planning';
import PlaceScreen from './screen/Place';
import ItineraryScreen from './screen/Itinerary';
import ChoosePlaceScreen from './screen/ChoosePlace';
import TripSummaryScreen from './screen/TripSummary';
import MapsScreen from './screen/MapsScreen';
import SignInScreen from './screen/SignIn';
import SignUpScreen from './screen/SignUp';
import CityTripScreen from './screen/CityTrip';
import PlaceToVisitScreen from './screen/PlaceToVisit';
import ScheduleScreen from './screen/Schedule';
import Deneme from './screen/deneme';
import AddLocationScreen from './screen/AddLocation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      {/* <Stack.Screen name="Deneme" component={Deneme} /> */}
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Create"
        component={CreateStackNavigator}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function CreateStackNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CreateTrip"
        component={CreateTripScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Planning"
        component={PlanningScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CreateTrip')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Place"
        component={PlaceScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Planning')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Planning')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Itinerary"
        component={ItineraryScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Place')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ChoosePlace"
        component={ChoosePlaceScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Itinerary')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TripSummary"
        component={TripSummaryScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ChoosePlace')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CityTrip"
        component={CityTripScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TripSummary')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PlaceToVisit"
        component={PlaceToVisitScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CityTrip')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MapsScreen"
        component={MapsScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CityTrip')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CityTrip')}>
              <Icon name="left" size={24} fill="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
}
function AboutStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
// function Tabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: 'white',
//           marginHorizontal: 20,
//           padding: 10,
//           borderRadius: 10,
//           position: 'absolute',
//           bottom: 10,
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={StackNavigator}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Icon name="home" size={36} fill={focused ? 'blue' : 'black'} />
//               <Text
//                 style={{
//                   color: focused ? 'blue' : 'black',
//                   fontSize: 12,
//                   fontWeight: '400',
//                 }}>
//                 Home
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="CreateTrip"
//         component={CreateStackNavigator}
//         options={{
//           tabBarStyle: {display: 'none'},
//           tabBarIcon: ({focused}) => (
//             <Text
//               style={{
//                 color: 'white',
//                 fontSize: 18,
//                 fontWeight: '600',
//                 justifyContent: 'center',
//                 position: 'absolute',
//                 bottom: 35,
//                 alignItems: 'center',
//                 paddingHorizontal: 20,
//                 paddingVertical: 12,
//                 backgroundColor: 'black',
//                 borderRadius: 10,
//               }}>
//               Create Trip
//             </Text>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="About"
//         component={AboutStackNavigator}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Icon name="about" size={36} fill={focused ? 'blue' : 'black'} />
//               <Text
//                 style={{
//                   color: focused ? 'blue' : 'black',
//                   fontSize: 12,
//                   fontWeight: '400',
//                 }}>
//                 About
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
