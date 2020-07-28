import { offlineService, authService } from '@oneblink/apps';

// OFFLINE SERVICE
const isOffline: boolean = offlineService.isOffline();

// AUTH SERVICE
const testAuthService = async () => {
    const formsAppId = 4;
    authService.init(
        {
            apiOrigin: 'https://my-api.com',
            loginDomain: 'https://my-login-domain.com',
        },
        {
            oAuthClientId: 'oAuthId',
            useSAML: true,
        },
    );
    const userName = authService.getUserFriendlyName();

    if (!!userName) {
        const stringUserName: string = userName;
        const iss = authService.getIssuerFromJWT(stringUserName);
    }
    const isAuthorised: boolean = await authService.isAuthorised(formsAppId);
    await authService.requestAccess(formsAppId);
    const route: string = await authService.login();
    const otherRoute: string = await authService.handleAuthentication();

    const amILoggedIn: boolean = authService.isLoggedIn();
    const idToken = await authService.getIdToken();
    if (!!idToken) {
        const stringIdToken: string = idToken;
    }

    // USER PROFILE
    const user = authService.getUserProfile();

    if (!!user) {
        const { email, supervisor } = user;
        if (!!email) {
            const emailString: string = email;
        }
        if (!!supervisor) {
            const { fullName } = supervisor;
            if (!!fullName) {
                const fullNameString: string = fullName;
            }
        }
    }
    await authService.logout();
};
