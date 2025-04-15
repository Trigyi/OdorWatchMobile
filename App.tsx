import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import NearbyToiletsScreen from './src/screens/NearbyToiletsScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 secondes de splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? <SplashScreen /> : <NearbyToiletsScreen />}
    </View>
  );
}
