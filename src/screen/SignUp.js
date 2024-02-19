import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Icon} from '../Icon';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // İsim kontrolü
    if (!name) {
      console.log('Lütfen bir isim girin.');
      return;
    }

    // E-posta kontrolü
    if (!email || !email.includes('@') || !email.includes('.')) {
      console.log('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    // Şifre kontrolü
    if (!password || password.length < 6) {
      console.log('Lütfen en az 6 karakter uzunluğunda bir şifre girin.');
      return;
    }

    // Şifrelerin uyuşup uyuşmadığını kontrol et
    if (password !== confirmPassword) {
      console.log('Şifreler uyuşmuyor.');
      return;
    }

    // Kullanıcıyı kayıt et
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Kayıt başarılı:', res.user);
        // Burada başarı durumunda yapılacak işlemleri ekleyebilirsiniz.
      })
      .catch(error => {
        console.log('Kayıt hatası:', error.message);
        // Burada hata durumunda yapılacak işlemleri ekleyebilirsiniz.
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Üye Ol</Text>
      <View style={styles.textInputContainer}>
        <View style={{gap: 4}}>
          <Text>Kullanıcı Adı</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="account" size={20} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={text => setName(text)}
              placeholder="İsminizi girin"
            />
          </View>
        </View>
        <View style={{gap: 4}}>
          <Text>E-posta</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="mail" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="E-posta"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
        </View>
        <View style={{gap: 4}}>
          <Text>Şifre</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="key" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Şifre"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
          </View>
        </View>
        <View style={{gap: 4}}>
          <Text>Şifre</Text>
          <View style={styles.textInputView}>
            <Icon fill="black" name="key" size={20} />
            <TextInput
              style={styles.textInput}
              placeholder="Şifreyi Onayla"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry
            />
          </View>
        </View>
      </View>
      <View style={styles.accountButtonView}>
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => navigation.navigate('SignInScreen')}>
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
          onPress={handleSignUp}>
          <Text style={styles.createAccountText}>Hesap Oluştur</Text>
        </TouchableOpacity>
        <View style={styles.signInView}>
          <Text>Zaten bir hesabın var mı?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.signInText}>Sign in</Text>
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
export default SignUpScreen;
