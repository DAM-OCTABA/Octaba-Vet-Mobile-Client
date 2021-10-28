import React, { useContext } from 'react';
import AuthStore, { IAuthStore } from '../stores/AuthStore';

/**
 * Contexte que emmagatzemarà el Store de l'autenticació.
 * @author Oscar Rovira López
 */
export const AuthContext = React.createContext(null);

type MapStateToProps = (store: IAuthStore) => any;

/**
 * React Hook que s'utilitza per obtenir dades del Store d'autenticació.
 * @param mapStateToProps Callback per determinar quins elements seleccionar
 * @returns Resultat de mapStateToProps
 * @author Oscar Rovira López
 */
export function useAuthStore(mapStateToProps: MapStateToProps) {
  const store = useContext<IAuthStore>(AuthContext);
  return mapStateToProps(store);
}

/**
 * Proveïdor que s'utiltiza per injectar el valor del Store d'autenticació a l'arbre de components
 * de React.
 * @returns React.Provider
 * @author Oscar Rovira López
 */
export const AuthStoreProvider = ({children}) => {
  return (
    <AuthContext.Provider value={AuthStore}>
      {children}
    </AuthContext.Provider>
  );
}
