import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useAuthStore } from '../contexts/AuthContext';
import { AxiosProvider } from '../contexts/AxiosContext';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';


const Stack = createNativeStackNavigator();

/**
 * Navegador principal de l'aplicació.
 * Mostra la finestra de Login o la Home depenent de l'estat de l'autenticació.
 * @author Oscar Rovira López
 */
const AuthNavigator = observer(() => {
  const { accessToken } = useAuthStore(({ accessToken }) => ({ accessToken }));
  const isSignedIn = accessToken !== null;
  return (
    <AxiosProvider accessToken={accessToken}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </AxiosProvider>

  );
});

export default AuthNavigator;
