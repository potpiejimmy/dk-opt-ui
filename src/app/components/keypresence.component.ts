import { Component, Host, Input } from '@angular/core';
import { HsmService } from '../services/hsm.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'key-presence',
  template: `
    <span *ngIf="appc.keystoreData[keyname]">
    <i class="material-icons boldgreen">verified_user</i> {{keyname}} ist gesetzt.
    </span>
    <span *ngIf="!appc.keystoreData[keyname]">
    <i class="material-icons boldred">error</i> {{keyname}} ist nicht gesetzt.
    </span>
`
})
export class KeyPresenceComponent {

    @Input() keyname: string;

    constructor(@Host() public appc: AppComponent) {
    }
}