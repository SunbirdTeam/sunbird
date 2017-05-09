


import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import {content} from '../model/index';

/**
 * This class implements a content related services for the application.
 */
@Injectable()
export class ContentService {

    searchUri: string;
    baseUrl: string;

    /**
     * Creates an instance of the ContentService class.
     * @param {Http} http - The injected Http
     * @constructor
     */
    constructor(private http: Http) {

        this.baseUrl = environment.apiBaseUrl;
        this.searchUri = environment.URI.CONTENT_SEARCH;

    }



    contentSearch(filter: any): Observable<boolean> {
        const request_data: any = {
            "request": filter, "params": {
                "cid": "12"
            }
        };
        return this.http.post(this.baseUrl + this.searchUri, request_data, this.getRequestOptions())
            .map((response: Response) => {
                console.log(response);
                return response.json();
            });
    }



    /**
     * Returns the RequestOptions for the HTTP POST and HTTP PATCH Requests
     * @return {RequestOptions} The request options.
     */
    getRequestOptions(): RequestOptions {
        const headers: Headers = new Headers({'Content-Type': 'application/json'});
        const requestOptions: RequestOptions = new RequestOptions({headers: headers});
        return requestOptions;
    }

}
