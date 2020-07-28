// Type definitions for @oneblink/apps 0.1
// Project: https://github.com/baz/oneblink/apps
// Definitions by: OneBlink Developers <https://github.com/oneblink>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.9

interface OneBlinkAppsTenant {
    apiOrigin: string;
    loginDomain: string;
}
type NoV = null | void;
interface UserProfile {
    isSAMLUser: boolean;
    providerType: string;
    providerUserId: string;
    userId: string;
    username: string;
    email: string | NoV;
    firstName: string | NoV;
    lastName: string | NoV;
    fullName: string | NoV;
    picture: string | NoV;
    role: string | NoV;
    supervisor:
        | {
              fullName: string | NoV;
              email: string | NoV;
              providerUserId: string | NoV;
          }
        | NoV;
}
declare namespace offlineService {
    function isOffline(): boolean;
}

declare namespace authService {
    function init(
        tenant: OneBlinkAppsTenant,
        options: {
            oAuthClientId: string;
            useSAML: boolean;
        },
    ): void;
    function getUserFriendlyName(): string | null;
    function getIssuerFromJWT(jwt: string | null | void): string | void;
    function isAuthorised(formsAppId: number): Promise<boolean>;
    function requestAccess(formsAppId: number): Promise<void>;
    function login(): Promise<string>;
    function handleAuthentication(): Promise<string>;
    function isLoggedIn(): boolean;
    function getIdToken(): Promise<string | void>;
    function getUserProfile(): UserProfile | null;
    function logout(): Promise<void>;
}

export { offlineService, authService };
