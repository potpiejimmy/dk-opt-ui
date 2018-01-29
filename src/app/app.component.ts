import { Component } from '@angular/core';
import { HsmService } from './services/hsm.service';
import { OptService } from './services/opt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  hsmData: any = {};
  processing: boolean = false;

  ngOnInit() {
    this.hsm.readAll().then(data => {
      console.log(data);
      this.hsmData = data;
    });
  }

  saveValue(id: string): Promise<any> {
    return this.hsm.writeValue(id, this.hsmData[id]);
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

  optInit() {
    this.processing = true;
    this.opt.init().then(result => {
      this.showSnack("Ergebnis: " + result.status);
      this.processing = false;
    });
  }

  showSnack(text: string) {
    this.snackBar.open(text, null, {duration:1000, verticalPosition: 'top', panelClass: 'yellow-bg'});
  }
}
