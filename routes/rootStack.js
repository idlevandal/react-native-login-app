import React, { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./authStack";
import AppStack from "./appStack";

import { AuthContext } from '../context';

const Stack = createStackNavigator();

export default function RootStack() {
	const [userLoggedIn, setUserLoggedIn] = useState(false);

	const authContext = React.useMemo(() => {
		return {
			signIn: () => {
				// setIsLoading(false);
				setUserLoggedIn(true);
			},
			signUp: () => {
				// setIsLoading(false);
				setUserLoggedIn(true);
			},
			signOut: () => {
				// setIsLoading(false);
				setUserLoggedIn(false);
			},
		}
	}, []);

	return (
		<AuthContext.Provider value={authContext}>
			<Stack.Navigator headerMode='none'>
				{userLoggedIn ?
					<Stack.Screen name='AppStack' component={AppStack} />
					:
					<Stack.Screen name='AuthStack' component={AuthStack} />
				}
			</Stack.Navigator>
		</AuthContext.Provider>
	)
}