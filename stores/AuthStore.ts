import {types, flow, Instance, SnapshotIn, SnapshotOut, applySnapshot} from 'mobx-state-tree';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import jwt_decode from 'jwt-decode';
import { Toast } from 'native-base';
import Constants from 'expo-constants';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const { oidcDomain, clientId } = Constants.manifest.extra;

let discovery: AuthSession.DiscoveryDocument = null;

/**
 * Store on s'emmagatzemaran les dades d'autenticació. S'injecta posteriorment en l'arbre de
 * components de React mitjançant el patró "Context", format per uns consumidors que busquen
 * el Provider més proper en l'arbre en direcció cap a l'arrel.
 * També s'utilitza el patró Singleton, degut a que no s'exposa el constructor del model
 * AuthStore, i per tant només deixant-ne crear una instància.
 * @author Oscar Rovira López
 */
const AuthStore = types
    .model("AuthStore", {
        userName: types.maybeNull(types.string),
        permissions: types.array(types.string),
        isAuthenticating: false,
        authError: types.maybeNull(types.frozen()),
        accessToken: types.maybeNull(types.string),
        refreshToken: types.maybeNull(types.string),
        idToken: types.maybeNull(types.string),
        autoLogin: true,
    })
    .actions(self => {
        const authenticate = flow(function*() {
            self.isAuthenticating = true;
            self.autoLogin = false;
            discovery = yield AuthSession.fetchDiscoveryAsync(oidcDomain);
            const authReqOptions: AuthSession.AuthRequestConfig = {
                redirectUri,
                clientId,
                responseType: AuthSession.ResponseType.Code,
                prompt: AuthSession.Prompt.Login,
                scopes: ['openid', 'profile', 'email', 'offline_access'],
                extraParams: {
                    audience: 'https://octaba-vet-api/',
                    access_type: 'offline',
                },
            };

            const request = new AuthSession.AuthRequest(authReqOptions);
            const result: AuthSession.AuthSessionResult = yield request.promptAsync(discovery, {useProxy});
            if(result.type == 'success') {
                const tokenResult: AuthSession.TokenResponse = yield AuthSession.exchangeCodeAsync({
                    clientId,
                    redirectUri,
                    code: result.params.code,
                    extraParams: {
                        code_verifier: request.codeVerifier || '',
                    },
                }, discovery);
                const { accessToken, idToken, refreshToken } = tokenResult;
                self.accessToken = accessToken;
                self.idToken = idToken;
                self.refreshToken = refreshToken;
                const accessTokend = jwt_decode(accessToken);
                const idTokend = jwt_decode(idToken);
                self.permissions = accessTokend.permissions;
                self.userName = idTokend.name;
                self.isAuthenticating = false;
            }
            else
            {
                Toast.show({
                    title: 'Operació cancel·lada',
                    status: 'error',
                    description: 'S\'ha cancel·lat l\'inici de sessió',
                });
                self.isAuthenticating = false;
            }
        });

        const deauthenticate = flow(function*() {
            yield AuthSession.revokeAsync({ token: self.refreshToken, clientId: 'MDpgsXHyoBSQWWC82NH03w5ikhIa9oWK' }, discovery);
            applySnapshot(self, {autoLogin: false});
        });

        return { authenticate, deauthenticate };
    });

export default AuthStore.create();

export interface IAuthStore extends Instance<typeof AuthStore>{}
export interface IAuthStoreSnapshotIn extends SnapshotIn<typeof AuthStore>{}
export interface IAuthStoreSnapshotOut extends SnapshotOut<typeof AuthStore>{}
