import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

export class BaseService {
    constructor (
        private http: HttpClient,
        private snackBar: MatSnackBar) {
    }

    get(url: string): Promise<any> {
        return this.http.get(url).toPromise().catch(err => this.handleError(err));
    }

    put(url: string, val: any): Promise<any> {
        return this.http.put(url, val).toPromise().catch(err => this.handleError(err));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', JSON.stringify(error)); // XXX for debugging purposes
        if (!error.status) error.message = "Sorry, " + environment.API_URL + " cannot be reached.";
        this.snackBar.open(error.message || JSON.stringify(error), null, {verticalPosition: 'top', panelClass: 'yellow-bg'});
        return Promise.reject(error.message || error);
    }
}
