import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from './screen/home';
import DetailPage from './screen/DetailPage';
import {Icon} from './Icon';
import {Stack} from './App';

export function StackNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={{
          tabBarVisible: false,
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="left" size={24} fill={null} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
