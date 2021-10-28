import { describe, expect, it, jest } from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import axios from 'axios';
import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NbProvider } from '../utils';
import AuthNavigator from '../../navigators/AuthNavigator';

jest.mock('axios');

/**
 * Tests per al component AuthNavigator.
 * @author Oscar Rovira López
 */
describe('<AuthNavigator />', () => {
  /**
   * Test que comprova que es mostri la finestra de login si no hi ha sessió iniciada (accessToken 
   * és null).
   * @author Oscar Rovira López
   */
  it('shows login page', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve()),
      accessToken: null,
    }

    // Act
    const { queryByText } = render(
      <NbProvider>
        <NavigationContainer>
          <AuthContext.Provider value={authStoreValue}>
            <AuthNavigator />
          </AuthContext.Provider>
        </NavigationContainer>
      </NbProvider>
    );

    // Assert
    expect(queryByText('Inicia sessió o registra\'t per continuar')).not.toBeNull();
  });

  /**
   * Test que comprova que es mostra la finestra d'usuari perquè hi ha sessió iniciada (accessToken
   * NO és null).
   * @author Oscar Rovira López
   */
  it('shows user page', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve()),
      accessToken: 'faketoken',
      permissions: [],
    };

    (axios.get as any).mockResolvedValue({ data: { message: 'mock' } })

    // Act
    const { queryByText } = render(
      <NbProvider>
        <NavigationContainer>
          <AuthContext.Provider value={authStoreValue}>
            <AuthNavigator />
          </AuthContext.Provider>
        </NavigationContainer>
      </NbProvider>
    );

    // Assert
    expect(queryByText('Inicia sessió o registra\'t per continuar')).toBeNull();
    expect(queryByText('Ets Usuari')).not.toBeNull();

  });
});
