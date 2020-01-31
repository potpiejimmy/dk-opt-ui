import { Component } from '@angular/core';
import { HsmService } from './services/hsm.service';
import { OptService } from './services/opt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Buffer } from 'buffer';
import { Utils } from './util/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private hsm: HsmService,
    private opt: OptService,
    private snackBar: MatSnackBar) {
  }
  
  adminData: any = {};
  keystoreData: any = {};

  processing: boolean = false;

  registrationType: string = "new";

  ngOnInit() {
    this.updateAll();
  }

  updateAll() {
    this.hsm.readAdminAll().then(data => {
      this.adminData = data;
      this.adminData.herstellerid = Utils.ebcdicToAscii(data.herstellerid);
      this.adminData.herstellerserialno = Utils.ebcdicToAscii(data.herstellerserialno);
      this.adminData.betreiberid = Utils.ebcdicToAscii(data.betreiberid);
      return this.hsm.readKeystoreProperties();
    }).then(data => {
      this.keystoreData = data;
    });
  }

  saveValue(id: string): Promise<any> {
    return this.hsm.writeAdminValue(id, this.adminData[id]);
  }

  saveTerminalProperties() {
    this.saveValue('terminalid').then(() =>
    this.saveValue('betreiberblz').then(() => {
        this.showSnack("Die Werte wurden gespeichert.");
    }));
  }

  savePS() {
    this.saveValue('ps_host').then(() =>
    this.saveValue('ps_port').then(() => {
        this.showSnack("Die Werte wurden gespeichert.");
    }));
  }

  setOZP() {
    this.saveValue('ozp').then(() => this.showSnack("Der Onlinezeitpunkt wurde gesetzt."));
  }

  optPreInit() {
    this.optProcess(this.opt.preinit());
  }

  optOutOfOrder() {
    this.optProcess(this.opt.outoforder());
  }

  optRegister() {
    this.optProcess(this.opt.register(this.registrationType));
  }

  optInit() {
    this.optProcess(this.opt.init());
  }

  optPers() {
    this.optProcess(this.opt.pers());
  }

  optProcess(optResult: Promise<any>) {
    this.processing = true;
    optResult.then(result => {
      this.showSnack(result.status);
      this.processing = false;
      this.updateAll();
    });
  }

  showSnack(text: string) {
    this.snackBar.open(text, null, {duration:5000, verticalPosition: 'top', panelClass: 'yellow-bg'});
  }
}
