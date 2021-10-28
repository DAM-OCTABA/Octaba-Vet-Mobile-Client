import 'reflect-metadata';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { AuthStoreProvider } from './contexts/AuthContext';
import AuthNavigator from './navigators/AuthNavigator';

/**
 * Punt d'entrada a l'aplicació. Conté els diferents proveïdors que s'empraran en l'aplicació.
 * Carrega l'AuthNavigator.
 * @returns React.Element
 * @author Oscar Rovira López
 */
export default function App() {

  return (
    <NativeBaseProvider>
      <AuthStoreProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </AuthStoreProvider>
    </NativeBaseProvider>
  );
}


