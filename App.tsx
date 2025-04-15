import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import NearbyToiletsScreen from './src/screens/NearbyToiletsScreen';
import AdminCaptorsScreen from './src/screens/AdminCaptorsSCreen';
import { RootStackParamList } from './src/navigation/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NearbyToilets">
        <Stack.Screen 
          name="NearbyToilets" 
          component={NearbyToiletsScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AdminCaptors" 
          component={AdminCaptorsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
