import LottieView from 'lottie-react-native';
import { Button, Center, Heading, Text, VStack } from 'native-base';
import * as React from 'react';
import { useAuthStore } from '../contexts/AuthContext';
import { useAxios } from '../contexts/AxiosContext';

const vetAnim = require('../assets/vet.json');
const userAnim = require('../assets/user.json');

/**
 * Pantalla que es mostra als usuaris una vegada han iniciat sessió.
 * Mostra si l'usuari és Veterinari o no.
 * @returns React.Element
 * @author Oscar Rovira López
 */
const HomeScreen = () => {
  const { permissions } = useAuthStore(({ permissions }) => ({ permissions }));
  const isVet = permissions.includes('read:pets');
  const [userText, setUserText] = React.useState('');
  const [vetText, setVetText] = React.useState('');
  const axios = useAxios();
  const role = isVet ? 'Veterinari' : 'Usuari';
  const file = isVet ? vetAnim : userAnim;
  const { deauthenticate } = useAuthStore(({ deauthenticate }) => ({ deauthenticate }));
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth');
        setUserText(data?.message || '');
      } catch {
        setUserText('No s\'ha pogut carregar el text del servidor. No estàs autenticat.');
      }
    })();
    (async () => {
      try {
        const { data } = await axios.get('/api/pets');
        setVetText(data?.message || '');
      } catch {
        setVetText('No s\'ha pogut carregar el text de veterinari del servidor. Potser no ets veterinari.');
      }
    })();
  }, []);
  return (
    <Center safeArea flex={1} p="2" py="8" w="100%" mx="auto" bgColor="white">
      <LottieView style={{ width: '80%' }}
        source={file}
        autoPlay
      />
      <VStack space={3} mt="5">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Ets {role}
        </Heading>
        <Text>{userText}</Text>
        <Text>{vetText}</Text>
        <Button mt="2" colorScheme="indigo" _text={{ color: 'white' }}
          onPress={() => deauthenticate()}
        >
          Tancar Sessió
        </Button>
      </VStack>
    </Center>
  );
}


export default HomeScreen;
