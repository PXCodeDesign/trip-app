import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {Icon} from '../Icon';
import {authErrorMessageParser} from '../error/authErrorMessageParser';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const initialFormValues = {
  email: 'ates4889@gmail.com',
  password: '123456',
};

const SignInScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  GoogleSignin.configure({
    webClientId:
      '676532364904-8av8ddm861d0cb19rn7u70uiqup0175b.apps.googleusercontent.com', // Replace with your Web Client ID
    offlineAccess: true,
  });

  const handleChange = (field, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play

      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      console.log('Signed in with Google!');
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
    }
  }

  async function handleFormSubmit() {
    if (formValues.email === '' || formValues.password === '') {
      showMessage({
        message: 'E-mail or Password is empty',
        type: 'info',
        backgroundColor: 'black', // Added backgroundColor for FlashMessage color
      });
    } else {
      try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(
          formValues.email,
          formValues.password,
        );
        showMessage({
          message: 'Congrats !!!',
          type: 'success',
          backgroundColor: 'black', // Added backgroundColor for FlashMessage color
        });
        navigation.navigate('HomeScreen');
      } catch (error) {
        showMessage({
          message: authErrorMessageParser(error.code),
          type: 'info',
          backgroundColor: 'black', // Added backgroundColor for FlashMessage color
        });
      } finally {
        setLoading(false);
      }
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUpScreen');
  }

  return (
    <ScrollView style={styles.container}>
      <FlashMessage
        color="orange"
        style={{
          backgroundColor: '#f5f7fc',
          borderRadius: 15,
          marginHorizontal: 30,
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Text style={styles.title}>Trip App</Text>
      <View style={styles.textInputContainer}>
        <View style={{gap: 4}}>
          <Text>E-posta</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="mail" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              onChangeText={text => handleChange('email', text)}
            />
          </View>
        </View>
        <View style={{gap: 4}}>
          <Text>Şifre</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="key" size={20} />
            <TextInput
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
              }}
              placeholder="Password"
              onChangeText={text => handleChange('password', text)}
              secureTextEntry
            />
          </View>
        </View>
      </View>
      <View style={styles.accountButtonView}>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }>
          <Icon fill="#1e1d2e" name="google" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Icon fill="#1e1d2e" name="facebook" size={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate('SignInScreen')}>
          <Icon fill="#1e1d2e" name="ios" size={28} />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 30, gap: 10}}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleFormSubmit}>
          <Text style={styles.createAccountText}>Giriş Yap</Text>
        </TouchableOpacity>
        <View style={styles.signInView}>
          <Text>Hesabınız yok mu?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: 'white', height: '100%'},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 50,
    color: 'black',
  },
  textInputContainer: {
    marginHorizontal: 30,
    gap: 10,
    marginVertical: 10,
  },
  textInput: {color: 'black', fontSize: 16, fontWeight: '500', width: '95%'},
  textInputView: {
    backgroundColor: '#f5f7fc',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#428bf8',
  },
  accountButton: {
    backgroundColor: '#f5f7fc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e8f8',
    padding: 10,
  },
  accountButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 60,
    marginVertical: 20,
  },
  createAccountButton: {
    backgroundColor: '#1e1d2e',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  createAccountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  signInView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  signInText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SignInScreen;
