import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { NbProvider } from '../utils';
import Login from '../../screens/Login';

/**
 * Tests per al component Login.
 * @author Oscar Rovira López
 */
describe('<Login />', () => {
  /**
   * Test que comprova que en obrir la pantalla de login per primera vegada (autoLogin és true)
   * es fa la crida al mètode autenticate del authStore per iniciar el procés d'inici de sessió.
   * @author Oscar Rovira López
   */
  it('tries to authenticate', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: true,
      authenticate: jest.fn(() => Promise.resolve())
    }

    // Act
    render(
      <NbProvider>
        <AuthContext.Provider value={authStoreValue}>
          <Login />
        </AuthContext.Provider>
      </NbProvider>
    );

    // Assert
    expect(authStoreValue.authenticate).toHaveBeenCalledTimes(1);
  });


  it('does not try to authenticate', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve())
    }

    // Act
    render(
      <NbProvider>
        <AuthContext.Provider value={authStoreValue}>
          <Login />
        </AuthContext.Provider>
      </NbProvider>
    );

    // Assert
    expect(authStoreValue.authenticate).toHaveBeenCalledTimes(0);
  });


  it('tries to authenticate on press button', async () => {
    // Arrange
    const authStoreValue = {
      autoLogin: false,
      authenticate: jest.fn(() => Promise.resolve())
    }

    // Act
    const { getByA11yLabel } = render(
      <NbProvider>
        <AuthContext.Provider value={authStoreValue}>
          <Login />
        </AuthContext.Provider>
      </NbProvider>
    );
    fireEvent.press(getByA11yLabel('Continuar'));

    // Assert
    expect(authStoreValue.authenticate).toHaveBeenCalledTimes(1);
  });
});