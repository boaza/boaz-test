import type { Configuration, RedirectRequest } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

// Azure AD B2C configuration
const TENANT_ID = '35102502-39ba-44ac-acc4-c185e0bf9285';

export const msalConfig: Configuration = {
    auth: {
        clientId: '5731266e-9e3d-4525-90bf-48ba980c967b', // Replace with your Azure AD B2C Application ID
        authority: `https://login.microsoftonline.com/${TENANT_ID}`, // Replace with your tenant info
        knownAuthorities: ['login.microsoftonline.com'], // Replace with your tenant name
        redirectUri: process.env.NODE_ENV === 'development' ? 
            'http://localhost:5173' : 
            'https://boaz-test.azurewebsites.net', // Update with your app's redirect URI
        postLogoutRedirectUri: 'https://boaz-test.azurewebsites.net', // Update with your app's post-logout redirect URI
        navigateToLoginRequestUrl: false
    },
    cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
        },
    },
};

// Add scopes for ID token to be used at MS Identity Platform endpoints.
export const loginRequest: RedirectRequest = {
    scopes: ['openid', 'profile', 'offline_access'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
