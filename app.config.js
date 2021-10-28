import 'dotenv/config';

export default {
    name: 'Octaba Vet',
    version: '1.0.0',
    scheme: 'octvet',
    extra: {
        apiUrl: process.env.API_URL || '',
        clientId: process.env.CLIENT_ID || '',
        oidcDomain: process.env.OIDC_DOMAIN || '',
    }
}