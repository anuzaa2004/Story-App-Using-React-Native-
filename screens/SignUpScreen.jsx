// screens/SignUpScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  SafeAreaView,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [offersAccepted, setOffersAccepted] = useState(false);

  
  const isFormValid = name.trim() !== '' && email.includes('@') && password.length >= 6 && termsAccepted;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subHeader}>Let the storytelling begin!</Text>
      <TextInput placeholder="First and Last Name*" style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#888" />
      <TextInput placeholder="Email*" style={styles.input} value={email} onChangeText={setEmail} placeholderTextColor="#888" keyboardType="email-address" />
      <TextInput placeholder="Password*" style={styles.input} value={password} onChangeText={setPassword} placeholderTextColor="#888" secureTextEntry />
      <View style={styles.toggleContainer}>
        <Switch value={termsAccepted} onValueChange={setTermsAccepted} trackColor={{ false: '#767577', true: '#6200EE' }} thumbColor={termsAccepted ? '#BB86FC' : '#f4f3f4'}/>
        <Text style={styles.toggleText}>I have read and accept ioTales Privacy Policy and Terms & Conditions</Text>
      </View>
      <View style={styles.toggleContainer}>
        <Switch value={offersAccepted} onValueChange={setOffersAccepted} trackColor={{ false: '#767577', true: '#6200EE' }} thumbColor={offersAccepted ? '#BB86FC' : '#f4f3f4'} />
        <Text style={styles.toggleText}>Signup to receive our emails and offers</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.disabledButton]}
        onPress={() => navigation.replace('MainApp')}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.linkText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#4A148C', padding: 20, justifyContent: 'center' },
    header: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    subHeader: { fontSize: 16, color: 'white', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#3A006A', color: 'white', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16 },
    toggleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    toggleText: { color: 'white', flex: 1, marginLeft: 10 },
    button: { backgroundColor: '#31B454', borderRadius: 25, padding: 15, alignItems: 'center', marginTop: 10 },
    disabledButton: { backgroundColor: '#555' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    footerText: { color: 'white', textAlign: 'center', marginTop: 20 },
    linkText: { fontWeight: 'bold' },
});

export default SignUpScreen;