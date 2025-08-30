import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert, // Import Alert
} from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
     if (email.trim().toLowerCase() === 'story@email.com' && password === 'password') {
      navigation.replace('MainApp');
    } else {
      Alert.alert('Sign In Failed', 'Invalid email or password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subHeader}>Let the story continue!</Text>
      <TextInput
        placeholder="Email*"
        style={styles.input}
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password*"
        style={styles.input}
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.linkText}>Sign Up</Text>
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
    button: { backgroundColor: '#31B454', borderRadius: 25, padding: 15, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    footerText: { color: 'white', textAlign: 'center', marginTop: 20 },
    linkText: { fontWeight: 'bold' },
});

export default SignInScreen;