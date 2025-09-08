import type { Configuration, RedirectRequest } from '@azure/msal-browser';
import { LogLevel } from '@azure/msal-browser';

// Azure AD B2C configuration
export const msalConfig: Configuration = {
    auth: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD B2C Application ID
        authority: 'https://YOUR_TENANT_NAME.b2clogin.com/YOUR_TENANT_NAME.onmicrosoft.com/YOUR_SIGN_IN_POLICY', // Replace with your tenant info
        knownAuthorities: ['YOUR_TENANT_NAME.b2clogin.com'], // Replace with your tenant name
        redirectUri: 'http://localhost:5173', // Update with your app's redirect URI
        postLogoutRedirectUri: 'http://localhost:5173', // Update with your app's post-logout redirect URI
        navigateToLoginRequestUrl: false,
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
