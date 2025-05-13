
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import { AppContextProvider } from './context/AppContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContextProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </AppContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
