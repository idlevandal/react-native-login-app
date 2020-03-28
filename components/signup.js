import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import firebase from '../database/firebase';

import {AuthContext} from '../context';

const SignUpSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).required()
})

export default function Signup({navigation}) {
	const {signUp} = React.useContext(AuthContext);
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
				initialValues={{ name: '', email: '', password: '' }}
				validationSchema={SignUpSchema}
				onSubmit={(values, actions) => {
					setIsLoading(true);
					firebase
						.auth()
						.createUserWithEmailAndPassword(values.email, values.password)
						.then((res) => {
							res.user.updateProfile({
								displayName: values.name
							})
							.then(() => {
								console.log('user sucessfully created');
								setIsLoading(false);
								signUp();
							});
							// console.log('user sucessfully created');
							// setIsLoading(false);
							// signUp();
						})
						.catch(err => {
							console.log(err);
							setIsLoading(false);
						})
					// actions.resetForm();
				}}
			>
				{(formProps) => (
					<View>
						<TextInput
							style={styles.inputStyle}
							placeholder="Name"
							onChangeText={formProps.handleChange('name')}
							value={formProps.values.name}
							onBlur={formProps.handleBlur('name')}
						/>
						<Text style={styles.errorText}>{formProps.touched.name && formProps.errors.name}</Text>
						<TextInput
							style={styles.inputStyle}
							placeholder="Email"
							onChangeText={formProps.handleChange('email')}
							value={formProps.values.email}
							onBlur={formProps.handleBlur('email')}
						/>
						<Text style={styles.errorText}>{formProps.touched.email && formProps.errors.email}</Text>
						<TextInput
							style={styles.inputStyle}
							placeholder="Password"
							onChangeText={formProps.handleChange('password')}
							value={formProps.values.password}
							onBlur={formProps.handleBlur('password')}
							secureTextEntry={true}
						/>
						<Text style={styles.errorText}>{formProps.touched.password && formProps.errors.password}</Text>
						<Button
							color="#3740FE"
							title="Signup"
							onPress={formProps.handleSubmit}
						/>

						<Text
							style={styles.loginText}
							onPress={() => {navigation.navigate('Login'); formProps.setErrors({});}}>
							Already Registered? Click here to login
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
		marginTop: 15,
		marginBottom: 2,
		paddingBottom: 10,
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