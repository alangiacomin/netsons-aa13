/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FumettoApi {
    /**
     * List
     * Display a listing of the resource.
     * @returns any
     * @throws ApiError
     */
    public static list(): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fumetti',
        });
    }
    /**
     * Store
     * Store a newly created resource in storage.
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static store(
        requestBody: {
            /**
             * Must not be greater than 255 characters.
             */
            Titolo: string;
            Numero: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/fumetti',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Show
     * Display the specified resource.
     * @param fumettoId The ID of the fumetto.
     * @returns string
     * @throws ApiError
     */
    public static show(
        fumettoId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/fumetti/{fumetto_id}',
            path: {
                'fumetto_id': fumettoId,
            },
        });
    }
    /**
     * Update
     * Update the specified resource in storage.
     * @param fumettoId The ID of the fumetto.
     * @returns void
     * @throws ApiError
     */
    public static update(
        fumettoId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/fumetti/{fumetto_id}',
            path: {
                'fumetto_id': fumettoId,
            },
        });
    }
    /**
     * Remove
     * Remove the specified resource from storage.
     * @param fumettoId The ID of the fumetto.
     * @returns void
     * @throws ApiError
     */
    public static remove(
        fumettoId: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/fumetti/{fumetto_id}',
            path: {
                'fumetto_id': fumettoId,
            },
        });
    }
}
