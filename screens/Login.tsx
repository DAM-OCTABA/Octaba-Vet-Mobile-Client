import React, { useEffect } from 'react';
import { Button, Center, Heading, Text, VStack } from 'native-base';
import { useAuthStore } from '../contexts/AuthContext';
import { observer } from 'mobx-react-lite';

/**
 * Pantalla que es mostra quan l'usuari no ha iniciat sessió o l'ha tancat.
 * Aquesta pantalla obre automàticament el diàleg d'iniciar sessió si es tracta de la primera
 * vegada que s'obre.
 * @author Oscar Rovira López
 */
const LoginScreen = observer(() => {
  const { 
    autoLogin,
    authenticate
  } = useAuthStore(({autoLogin, authenticate}) => ({autoLogin, authenticate}));
  useEffect(() => {
    if(autoLogin)
      authenticate();
  }, []);

  return (
    <Center safeArea flex={1} p="2" py="8" w="90%" mx="auto">
      <Heading size="lg" fontWeight="600" color="coolGray.800">
        Octaba Vet
      </Heading>
      <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
        Inicia sessió o registra't per continuar
      </Heading>
      <VStack space={3} mt="5">
        <Text fontSize="sm" color="muted.700" fontWeight={400} textAlign="justify">
          Utilitzem un proveïdor extern per l'autenticació.
          Prement el botó, seràs redirigit a ell.
        </Text>
        <Button mt="2" colorScheme="indigo" _text={{color: 'white'}}
          onPress={() => authenticate()} accessibilityLabel="Continuar"
        >
          Continuar
        </Button>
      </VStack>
    </Center>
  );
});

export default LoginScreen;