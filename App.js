// App.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screen components
import SignInScreen from './screens/SignInScreen.jsx';
import SignUpScreen from './screens/SignUpScreen.jsx';
import StorySelectionScreen from './screens/StorySelectionScreen.jsx';
import StoryScreen from './screens/StoryScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main App component with Bottom Tab Navigator
const MainApp = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Stories') {
          iconName = focused ? 'book' : 'book-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person-circle' : 'person-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#31B454',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#3A006A' },
    })}
  >
    <Tab.Screen name="Stories" component={StorySelectionScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Main App Navigator
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Story" component={StoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;