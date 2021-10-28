import { NativeBaseProvider } from 'native-base';
import React from 'react';

/**
 * Proveïdor de NativeBase correctament configurat per als tests.
 * @author Oscar Rovira López
 */
 export const NbProvider = ({children}) => (
  <NativeBaseProvider
    initialWindowMetrics={{
      frame: { x: 0, y: 0, width: 0, height: 0 },
      insets: { top: 0, left: 0, right: 0, bottom: 0 },
    }}
    >
    {children}
  </NativeBaseProvider>
);