import {
    StyleSheet,
    Platform,
    Text,
    View,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
  } from 'react-native';
  import React, {useContext, useState} from 'react';
  import {FAB} from '@rneui/themed';
  import Snackbar from 'react-native-snackbar';
  //context API
  import AppwriteContext from '../Appwrite/AppwriteContext';
  import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
  import {AuthStackParamList} from '../routes/AuthStack';
import Home from './Home';

  type LoginScreenProps = NativeStackScreenProps<AuthStackParamList>
  
const Login = ({navigation} : LoginScreenProps) => {
  // console.log(navigation.navigate('Login'))

    const {appwrite, setIsLoggedIn} = useContext(AppwriteContext);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('')

    const handleLogin = ()=>{
        if(email.length < 1 || password.length < 1){
            setError("All fields are required");
        }else{
            const user = {
                email,
                password
            }
            appwrite.Login(user)
            .then(response => {
                setIsLoggedIn(true);
                Snackbar.show({
                    text:'Login successfully',
                    duration:Snackbar.LENGTH_LONG
                })
                  navigation.navigate('Home')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
        }
        appwrite.Login({email,password})
        .then
    }

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.appName}>Authentication</Text>
    
            {/* Email */}
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Email"
              style={styles.input}
            />
    
            {/* Password */}
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor={'#AEAEAE'}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
            {/* Validation error */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
    
            {/* Login button */}
            <Pressable
              onPress={handleLogin}
              style={[styles.btn, {marginTop: error ? 10 : 20}]}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable>
    
            {/* Sign up navigation */}
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpContainer}>
              <Text style={styles.noAccountLabel}>
                Don't have an account?{'  '}
                <Text style={styles.signUpLabel}>Create an account</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      );
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    formContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
    },
    appName: {
      color: '#f02e65',
      fontSize: 40,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fef8fa',
      padding: 10,
      height: 40,
      alignSelf: 'center',
      borderRadius: 5,
  
      width: '80%',
      color: '#000000',
  
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 1,
    },
    errorText: {
      color: 'red',
      alignSelf: 'center',
      marginTop: 10,
    },
    btn: {
      backgroundColor: '#ffffff',
      padding: 10,
      height: 45,
  
      alignSelf: 'center',
      borderRadius: 5,
      width: '80%',
      marginTop: 20,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 3,
    },
    btnText: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    signUpContainer: {
      marginTop: 80,
    },
    noAccountLabel: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
    signUpLabel: {
      color: '#1d9bf0',
    },
  });