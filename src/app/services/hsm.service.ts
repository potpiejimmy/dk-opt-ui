import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

@Injectable()
export class HsmService {
    constructor (
        private http: HttpClient,
        private snackBar: MatSnackBar) {
    }

    readAll(): Promise<any> {
        return this.http.get(environment.API_URL+"/hsm").toPromise().catch(err => this.handleError(err));
    }

    readValue(id: string): Promise<any> {
        return this.http.get(environment.API_URL+"/hsm/" + id).toPromise().catch(err => this.handleError(err));
    }

    writeValue(id: string, val: string): Promise<any> {
        return this.http.put(environment.API_URL+"/hsm/" + id, {value:val}).toPromise().catch(err => this.handleError(err));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', JSON.stringify(error)); // XXX for debugging purposes
        if (!error.status) error.message = "Sorry, " + environment.API_URL + " cannot be reached.";
        this.snackBar.open(error.message || JSON.stringify(error));
        return Promise.reject(error.message || error);
    }
}
