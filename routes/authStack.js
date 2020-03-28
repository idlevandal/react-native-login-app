import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../components/login';
import Signup from '../components/signup';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ title: 'Signup' }}
        />       
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={
            {title: 'Login'},
            {headerLeft: null} 
          }
        />
      </Stack.Navigator>
    );
  }