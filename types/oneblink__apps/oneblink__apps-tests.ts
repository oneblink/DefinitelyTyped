import { offlineService, authService, OneBlinkAppsError, draftService, FormTypes } from '@oneblink/apps';

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

    // With no options
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

// DRAFT SERVICE
const testDraftService = async () => {
    const formsAppDrafts: FormTypes.FormsAppDraft[] = [
        {
            draftId: '2',
            externalId: 's',
            formId: 4,
            jobId: 'sasd',
            title: 'title',
            updatedAt: 'date',
            draftDataId: 'draftDataId',
        },
    ];
    draftService.registerDraftsListener(formsAppDrafts => {
        return null;
    });

    const form = {
        description: 'desc',
        elements: [],
        formsAppEnvironmentId: 4,
        formsAppIds: [4, 2],
        id: 2,
        isAuthenticated: true,
        isInfoPage: true,
        isMultiPage: true,
        name: 'name',
        organisationId: 'orgid',
        postSubmissionAction: 'URL' as const,
        submissionEvents: [],
        tags: ['tag'],
        publishEndDate: null,
        publishStartDate: null,
    };
    const newFormsAppDraft = {
        title: 'draftTitle',
        formId: 4,
        externalId: null,
        jobId: undefined,
    };
    const formSubmissionResult = {
        draftId: '4',
        externalId: 's',
        formsAppId: 3,
        jobId: 'sd',
        payment: {
            hostedFormUrl: 'sasds',
            submissionEvent: {
                isDraft: false,
                type: 'CP_PAY' as const,
                configuration: {
                    elementId: 'elementid',
                    gatewayId: 'sasds',
                },
            },
        },
        submissionTimestamp: 'date',
        preFillFormDataId: 'sasds',
        submission: {
            key: {},
            otherKey: 'sasd',
        },
        submissionId: '23',
        definition: form,
    };
    const accessKey = 'accessKey';
    await draftService.addDraft(newFormsAppDraft, formSubmissionResult, accessKey);

    await draftService.updateDraft(
        {
            ...newFormsAppDraft,
            draftId: 'id1',
            draftDataId: 'id2',
            updatedAt: 'date',
        },
        formSubmissionResult,
        accessKey,
    );

    const drafts = await draftService.getDrafts();
    for (const draft of drafts) {
        const { draftDataId, draftId, externalId, formId, jobId, title, updatedAt } = draft;
        let str: string = draftId;
        const num: number = formId;
        str = title;
        str = updatedAt;
        if (draftDataId && externalId && jobId) {
            str = draftDataId;
            str = externalId;
            str = jobId;
        }
    }

    const result = await draftService.getDraftAndData('34');
    const draftId: string | undefined = result?.draft.draftId;
    if (result) {
        const { draftId, externalId, jobId, formId, title, updatedAt, draftDataId } = result.draft;
        let str: string = draftId;
        const num: number = formId;
        str = title;
        str = updatedAt;
        if (draftDataId && externalId && jobId) {
            str = draftDataId;
            str = externalId;
            str = jobId;
        }
    }
    await draftService.deleteDraft('id', 5);
    await draftService.syncDrafts({
        formsAppId: 4,
        throwError: true,
    });
};
