import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { MsalProvider, MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import { msalConfig, loginRequest } from '../authConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
};

export const useAuth = () => {
    const { instance, accounts, inProgress } = useMsal();
    const account = accounts[0] || null;

    const login = async () => {
        try {
            await instance.loginRedirect(loginRequest);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await instance.logout();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const getAccessToken = async (): Promise<string | null> => {
        try {
            if (!account) {
                throw new Error('No account available');
            }

            const response = await instance.acquireTokenSilent({
                ...loginRequest,
                account,
            });

            return response.accessToken;
        } catch (error) {
            console.error('Failed to get access token:', error);
            return null;
        }
    };

    return {
        isAuthenticated: !!account,
        user: account,
        login,
        logout,
        getAccessToken,
        inProgress,
    };
};

export const AuthTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MsalAuthenticationTemplate 
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
    >
        {children}
    </MsalAuthenticationTemplate>
);
