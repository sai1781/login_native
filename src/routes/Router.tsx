import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppwriteContext from '../Appwrite/AppwriteContext';
import Loading from '../components/Loading';

//Routes
import AppStack from './AppStack';
import AuthStack from './AuthStack';

//Routes

const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext);

  //Here we are using the useEffect to see the changes...

  useEffect(() => {
    appwrite
      .getUser()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoading(true);
        }
      })
      .catch(_ => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }
  console.log(Loading);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
