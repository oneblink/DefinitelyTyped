// Type definitions for @oneblink/apps 0.1
// Project: https://github.com/baz/oneblink/apps
// Definitions by: OneBlink Developers <https://github.com/oneblink>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.9

interface OneBlinkAppsTenant {
    apiOrigin: string;
    loginDomain: string;
}
type NoU = null | undefined;
interface UserProfile {
    isSAMLUser: boolean;
    providerType: string;
    providerUserId: string;
    userId: string;
    username: string;
    email: string | NoU;
    firstName: string | NoU;
    lastName: string | NoU;
    fullName: string | NoU;
    picture: string | NoU;
    role: string | NoU;
    supervisor:
        | {
              fullName: string | NoU;
              email: string | NoU;
              providerUserId: string | NoU;
          }
        | NoU;
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
    function getIssuerFromJWT(jwt: string | NoU): string | void;
    function isAuthorised(formsAppId: number): Promise<boolean>;
    function requestAccess(formsAppId: number): Promise<void>;
    function login(): Promise<string>;
    function handleAuthentication(): Promise<string>;
    function isLoggedIn(): boolean;
    function getIdToken(): Promise<string | undefined>;
    function getUserProfile(): UserProfile | null;
    function logout(): Promise<void>;
}

export { offlineService, authService };
