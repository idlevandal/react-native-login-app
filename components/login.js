import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import firebase from '../database/firebase';
import { AuthContext } from '../context';

const LoginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
})

export default function Login({ navigation }) {
	const {signIn} = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	if(isLoading){
		return(
			<View style={styles.preloader}>
				<ActivityIndicator size="large" color="#9E9E9E"/>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Formik
				initialValues={{email: '', password: ''}}
				validationSchema={LoginSchema}
				onSubmit={(values, actions) => {
					setIsLoading(true);
					// actions.resetForm();
					firebase
						.auth()
						.signInWithEmailAndPassword(values.email, values.password)
						.then(res => {
							setIsLoading(false);
							signIn();
						})
						.catch(err => {
							setIsLoading(false);
							Alert.alert('Error!!!', err.toString());
						})
				}}
			>
				{(formProps) => (
					<View>
						<TextInput
							style={styles.inputStyle}
							placeholder="Email"
							value={formProps.values.email}
							onChangeText={formProps.handleChange('email')}
							onBlur={formProps.handleBlur('email')}
						/>
						<Text style={styles.errorText}>{formProps.touched.email && formProps.errors.email}</Text>
						<TextInput
							style={styles.inputStyle}
							placeholder="Password"
							value={formProps.values.password}
							onChangeText={formProps.handleChange('password')}
							onBlur={formProps.handleBlur('password')}
							secureTextEntry={true}
						/>
						<Text style={styles.errorText}>{formProps.touched.password && formProps.errors.password}</Text>
						<Button
							color="#3740FE"
							title="Login"
							onPress={formProps.handleSubmit}
						/>

						<Text
							style={styles.loginText}
							onPress={() => {navigation.navigate('Signup'); formProps.setErrors({});}}>
							Don't have account? Click here to signup
            </Text>
					</View>
				)}
			</Formik>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: 35,
		backgroundColor: '#fff'
	},
	inputStyle: {
		width: '100%',
		marginBottom: 15,
		paddingBottom: 15,
		alignSelf: "center",
		borderColor: "#ccc",
		borderBottomWidth: 1
	},
	loginText: {
		color: '#3740FE',
		marginTop: 25,
		textAlign: 'center'
	},
	preloader: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	errorText: {
		color: 'crimson',
		fontSize: 10
	}
});