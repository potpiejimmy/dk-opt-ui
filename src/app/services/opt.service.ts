import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from "./base.service";
import { environment } from '../../environments/environment';

@Injectable()
export class OptService extends BaseService {

    constructor (
        http: HttpClient,
        snackBar: MatSnackBar) {
            super(http, snackBar);
    }

    init(): Promise<any> {
        return this.get(environment.API_URL+"/opt/init");
    }

    preinit(): Promise<any> {
        return this.get(environment.API_URL+"/opt/preinit");
    }
}
