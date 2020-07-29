import { offlineService, authService, OneBlinkAppsError } from '@oneblink/apps';

// OFFLINE SERVICE
const isOffline: boolean = offlineService.isOffline();

// AUTH SERVICE
const testAuthService = async () => {
    const formsAppId = 4;
    authService.init({
        oAuthClientId: 'oAuthId',
        useSAML: true,
    });
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

// ONEBLINK APPS ERROR
const testOneBlinkAppsError = () => {
    // With no options
    const errWithNoOptions = new OneBlinkAppsError('My New OneBlink Error');

    // With options
    const errWithOptions = new OneBlinkAppsError('My New OneBlink Error', {
        title: 'Something',
        isOffline: true,
        requiresAccessRequest: true,
        requiresLogin: true,
        httpStatusCode: 401,
        originalError: errWithNoOptions,
    });

    const {
        title,
        httpStatusCode,
        isOffline,
        requiresAccessRequest,
        requiresLogin,
        originalError,
        message,
    } = errWithOptions;
    const titleString: string = title;
    const httpStatusCodeNum: number = httpStatusCode || 400;
    const isOfflineBool: boolean = isOffline;
    const requiresAccessRequestBool: boolean = requiresAccessRequest;
    const requiresLoginBool: boolean = requiresLogin;
    const thirdError = new OneBlinkAppsError('third', {
        originalError,
    });
    const messageString: string = message;
};
