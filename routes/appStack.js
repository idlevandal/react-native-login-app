import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../components/dashboard';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Dashboard' component={Dashboard} />
        </Stack.Navigator>
    );
}