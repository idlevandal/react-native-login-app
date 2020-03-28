import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import firebase from '../database/firebase';
import { AuthContext } from '../context';

export default function Dashboard({route, navigation}) {
  const {signOut} = React.useContext(AuthContext);

  onSignOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('signing out');
      signOut();
    })
    .catch(error => Alert.alert('Damn!!!', error.toString()))
  }    
    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Hello, {firebase.auth().currentUser.displayName || 'no user yet!'}
        </Text>
        <Text>
          Id: {firebase.auth().currentUser.uid}
        </Text>

        <Button
          color="#3740FE"
          title="Logout"
          onPress={() => onSignOut()}
        />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
})