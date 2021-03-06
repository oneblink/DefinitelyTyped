// Type definitions for @oneblink/apps 0.1
// Project: https://github.com/baz/oneblink/apps
// Definitions by: OneBlink Developers <https://github.com/oneblink>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.9

import type { NoU } from './types/misc';
import * as FormTypes from './types/forms';
import * as SubmissionEventTypes from './types/submissionEvents';
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
    function init(options: { oAuthClientId: string; useSAML: boolean }): void;
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

declare class OneBlinkAppsError extends Error {
    title: string;
    isOffline: boolean;
    requiresAccessRequest: boolean;
    requiresLogin: boolean;
    httpStatusCode: number | undefined;
    originalError: Error | undefined;

    constructor(
        message: string,
        options?: {
            title?: string;
            isOffline?: boolean;
            requiresAccessRequest?: boolean;
            requiresLogin?: boolean;
            httpStatusCode?: number;
            originalError?: Error;
        },
    );
}
declare namespace draftService {
    function registerDraftsListener(listener: (drafts: FormTypes.FormsAppDraft[]) => unknown): () => void;
    function addDraft(
        newDraft: FormTypes.NewFormsAppDraft,
        draftSubmission: FormTypes.FormSubmissionResult,
        accessKey: NoU | string,
    ): Promise<void>;
    function updateDraft(
        draft: FormTypes.FormsAppDraft,
        draftSubmission: FormTypes.FormSubmissionResult,
        accessKey: NoU | string,
    ): Promise<void>;
    function getDrafts(): Promise<FormTypes.FormsAppDraft[]>;
    function getDraftAndData(
        draftId: NoU | string,
    ): Promise<{
        draft: FormTypes.FormsAppDraft;
        draftData: { [key: string]: unknown };
    } | null>;
    function deleteDraft(draftId: string, formsAppId: number): Promise<void>;
    function syncDrafts(options: { formsAppId: number; throwError?: boolean }): Promise<void>;
}

interface QueryParameters {
    [property: string]: string | Array<string | number> | null;
}
declare namespace paymentService {
    function handlePaymentQuerystring(
        query: QueryParameters,
    ): Promise<{
        transaction: {
            isSuccess: boolean;
            errorMessage: string | NoU;
            id: string | NoU;
            creditCardMask: string | NoU;
            amount: number | NoU;
        };
        submissionResult: FormTypes.FormSubmissionResult;
    }>;
    function handlePaymentSubmissionEvent(
        submissionResult: FormTypes.FormSubmissionResult,
        paymentSubmissionEvent: SubmissionEventTypes.PaymentSubmissionEvent,
    ): Promise<FormTypes.FormSubmissionResult | undefined>;
}

declare namespace prefillService {
    function removePrefillFormData(prefillFormDataId: string): Promise<void>;
    function getPrefillFormData(
        formId: number,
        prefillFormDataId: string | NoU,
    ): Promise<{
        [property: string]: unknown;
    } | null>;
}

declare function useTenantCivicPlus(): void;
declare function useTenantOneBlink(): void;
export {
    offlineService,
    authService,
    draftService,
    paymentService,
    prefillService,
    OneBlinkAppsError,
    FormTypes,
    SubmissionEventTypes,
    useTenantCivicPlus,
    useTenantOneBlink,
};
