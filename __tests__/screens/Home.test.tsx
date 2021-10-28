import { describe, expect, it, jest } from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AxiosContext } from '../../contexts/AxiosContext';
import { NbProvider } from '../utils';
import Home from '../../screens/Home';

/**
 * Tests per al component Home.
 * @author Oscar Rovira López
 */
describe('<Home />', () => {
  /**
   * Test que valida que es mostra el text 'Ets Usuari' quan qui accedeix no té el rol de 
   * veterinari.
   * @author Oscar Rovira López
   */
  it('shows user page', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve()),
      accessToken: 'faketoken',
      permissions: [],
    }

    // Mock d'axios per no fer crida al servidor en el test
    const axios = {
      get: jest.fn(() => Promise.resolve({ data: { message: 'test' } }))
    }

    // Act
    const { getByText, findAllByText } = render(
      <NbProvider>
        <AuthContext.Provider value={authStoreValue}>
          <AxiosContext.Provider value={axios}>
            <Home />
          </AxiosContext.Provider>
        </AuthContext.Provider>
      </NbProvider>
    );
    const test = await findAllByText('test');
    const user = getByText('Ets Usuari');

    // Assert
    expect.assertions(2);
    expect(user).not.toBeNull();
    expect(test).toHaveLength(2);
  });

  /**
   * Test que valida que es mostra el text 'Ets Veterinari' quan qui accedeix té el rol de 
   * veterinari.
   * @author Oscar Rovira López
   */
  it('shows vet page', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve()),
      accessToken: 'faketoken',
      permissions: ['read:pets'],
    }

    // Mock d'axios per no fer crida al servidor en el test
    const axios = {
      get: jest.fn(() => Promise.resolve({ data: { message: 'test' } }))
    }

    // Act
    const { getByText, findAllByText } = render(
      <NbProvider>
        <NavigationContainer>
          <AuthContext.Provider value={authStoreValue}>
            <AxiosContext.Provider value={axios}>
              <Home />
            </AxiosContext.Provider>
          </AuthContext.Provider>
        </NavigationContainer>
      </NbProvider>
    );
    const test = await findAllByText('test');
    const user = getByText('Ets Veterinari');

    // Assert
    expect.assertions(2);
    expect(user).not.toBeNull();
    expect(test).toHaveLength(2);
  });
});