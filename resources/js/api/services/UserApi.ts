/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserApi {
    /**
     * Authenticated
     * Restituisce l'utente loggato
     * @returns any
     * @throws ApiError
     */
    public static authenticated(): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/authenticated',
        });
    }
    /**
     * Login
     * Gestisce il tentativo di login.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static login(
        requestBody: {
            /**
             * L'indirizzo email dell'utente. Must be a valid email address. The <code>email</code> of an existing record in the users table.
             */
            email: string;
            /**
             * La password.
             */
            password: string;
            remember?: boolean;
        },
    ): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Login fake
     * Gestisce il tentativo di login.
     * @returns any
     * @throws ApiError
     */
    public static loginFake(): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
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
    /**
     * List
     * Display a listing of the resource.
     * @returns any
     * @throws ApiError
     */
    public static list(): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user',
        });
    }
    /**
     * Store
     * Store a newly created resource in storage.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static store(
        requestBody: {
            /**
             * L'indirizzo email dell'utente. Must be a valid email address.
             */
            email: string;
            /**
             * Il nome completo dell'utente. Must not be greater than 255 characters.
             */
            name: string;
        },
    ): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Show
     * Display the specified resource.
     * @param id The ID of the user.
     * @returns any
     * @throws ApiError
     */
    public static show(
        id: number,
    ): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update
     * Update the specified resource in storage.
     * @param id The ID of the user.
     * @returns any
     * @throws ApiError
     */
    public static update(
        id: number,
    ): CancelablePromise<{
        id?: number;
        name?: string;
        email?: string;
        isSuperAdmin?: boolean;
        permissions?: any[];
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/user/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Destroy
     * Remove the specified resource from storage.
     * @param id The ID of the user.
     * @returns void
     * @throws ApiError
     */
    public static destroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user/{id}',
            path: {
                'id': id,
            },
        });
    }
}
