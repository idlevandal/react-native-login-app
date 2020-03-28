import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './routes/rootStack';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}




// const [isLoading, setIsLoading] = React.useState(true);
// const [userToken, setUserToken] = React.useState(null);

// const authContext = React.useMemo(() => {
//   return {
//     signIn: () => {
//       setIsLoading(false);
//       setUserToken('Jimbo');
//     },
//     signUp: () => {
//       setIsLoading(false);
//       setUserToken('Jimbo');
//     },
//     signOut: () => {
//       setIsLoading(false);
//       setUserToken(null);
//     },
//   }
// }, []);
