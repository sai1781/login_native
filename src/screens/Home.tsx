import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FAB} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
//context API
import AppwriteContext from '../Appwrite/AppwriteContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {AuthStackParamList} from '../routes/AuthStack';

type HomeScreenProps = NativeStackScreenProps<AuthStackParamList>


type userObj = {
  name: string;
  email: string;
};

const Home = ({navigation}:HomeScreenProps) => {
  const [userData, setUserData] = useState<userObj>();
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.Logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout Successfully',
        duration: Snackbar.LENGTH_LONG,
      });
      navigation.navigate('Login')
    });
  };

  useEffect(() => {
    appwrite.getUser().then(response => {
      if (response) {
        console.log(response);
        console.log("@@@@@@@@@@@@@@@@@@");

        const user: userObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    }).catch(error =>{
      console.log(error);
      console.log("sai");
    })
  }, [appwrite]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{name: 'logout', color: '#FFFFFF'}}
        onPress={handleLogout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
