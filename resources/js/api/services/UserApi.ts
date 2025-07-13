/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserApi {
    /**
     * Login
     * Gestisce il tentativo di login.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static login(
        requestBody: {
            /**
             * Must be a valid email address. The <code>email</code> of an existing record in the users table.
             */
            email: string;
            password: string;
            remember?: boolean;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static postApiUserLoginFake(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/loginFake',
        });
    }
    /**
     * Logout
     * @returns void
     * @throws ApiError
     */
    public static logout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
        });
    }
}
