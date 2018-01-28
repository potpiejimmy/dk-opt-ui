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

  ngOnInit() {
    this.hsm.readAll().then(data => {
      console.log(data);
      this.hsmData = data;
    });
  }

  save() {
    this.hsm.writeValue('terminalid', this.hsmData.terminalid).then(() => {
      this.hsm.writeValue('betreiberblz', this.hsmData.betreiberblz).then(() => {
        this.showSnack("Die Werte wurden gespeichert.");
      })
    });
  }

  setOZP() {
    this.hsm.writeValue('ozp', this.hsmData.ozp).then(() => this.showSnack("Der Onlinezeitpunkt wurde gesetzt."));
  }

  optInit() {
    this.opt.init().then(() => this.showSnack("Die OPT-Initialisierung wurde erfolgreich durchgeführt."));
  }

  showSnack(text: string) {
    this.snackBar.open(text, null, {duration:1000, verticalPosition: 'top', panelClass: 'yellow-bg'});
  }
}
