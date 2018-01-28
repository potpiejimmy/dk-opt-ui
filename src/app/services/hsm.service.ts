import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from "./base.service";
import { environment } from '../../environments/environment';

@Injectable()
export class HsmService extends BaseService {

    constructor (
        http: HttpClient,
        snackBar: MatSnackBar) {
            super(http, snackBar);
    }

    readAll(): Promise<any> {
        return this.get(environment.API_URL+"/hsm");
    }

    readValue(id: string): Promise<any> {
        return this.get(environment.API_URL+"/hsm/" + id);
    }

    writeValue(id: string, val: string): Promise<any> {
        return this.put(environment.API_URL+"/hsm/" + id, {value:val});
    }
}
