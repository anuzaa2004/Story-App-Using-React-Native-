// navigation/AppNavigator.js

import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import ALL Screens
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StorySelectionScreen from '../screens/StorySelectionScreen';
import StoryScreen from '../screens/StoryScreen';
import ProfileScreen from '../screens/ProfileScreen'; // <-- IMPORT THE NEW SCREEN

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Main app content with bottom tabs
function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'My Tales') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { backgroundColor: '#3A006A', borderTopWidth: 0 },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="My Tales" component={StorySelectionScreen} />
      {/* Use the new ProfileScreen instead of the placeholder */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Overall app navigator
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      {/* Auth Flow */}
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      
      {/* Main App Flow */}
      <Stack.Screen name="MainApp" component={MainAppTabs} />
      <Stack.Screen 
        name="Story" 
        component={StoryScreen}
        initialParams={{ story: null }}
        options={({ route }) => ({
          title: route.params.story?.title,
          headerShown: true,
          headerStyle: { backgroundColor: '#1C1C1E' },
          headerTintColor: 'white'
        })}
      />
    </Stack.Navigator>
  );
}