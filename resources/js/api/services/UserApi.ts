/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserApi {
    /**
     * @returns void
     * @throws ApiError
     */
    public static postApiUserLogin(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static postApiUserLogout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/logout',
        });
    }
}
