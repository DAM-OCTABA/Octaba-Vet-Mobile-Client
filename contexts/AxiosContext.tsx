import axios, { AxiosInstance } from 'axios';
import Constants from 'expo-constants';
import React, { FunctionComponent, useContext } from 'react';

/**
 * Contexte que emmagatzemarà l'instància actual d'Axios (llibreria per fer crides HTTP).
 * L'instància pot variar degut a que es crea amb configuració (header amb el token).
 */
export const AxiosContext = React.createContext(null);

/**
 * React Hook que retorna l'instància d'Axios injectada per el proveïdor més proper.
 * @returns AxiosInstance
 * @author Oscar Rovira López
 */
export function useAxios() {
  return useContext<AxiosInstance>(AxiosContext);
}

export type AxiosProviderProps = {
  accessToken: string,
};

/**
 * Proveïdor que injecta l'instància d'Axios a l'arbre de components de React.
 * @param props AxiosProviderProps
 * @returns React.Provider
 * @author Oscar Rovira López
 */
export const AxiosProvider: FunctionComponent<AxiosProviderProps> = (props) => {
  const instance = axios.create({
    baseURL: Constants.manifest.extra.apiUrl,
    headers: {
      Authorization: `Bearer ${props.accessToken}`
    }
  });
  return (
    <AxiosContext.Provider value={instance}>
      {props.children}
    </AxiosContext.Provider>
  );
}