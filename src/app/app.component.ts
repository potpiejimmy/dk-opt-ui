import { Component } from '@angular/core';
import { HsmService } from './services/hsm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private hsm: HsmService,
    private snackBar: MatSnackBar) {
  }

  hsmData: any = {};

  ngOnInit() {
    this.hsm.readAll().then(data => {
      console.log(data);
      this.hsmData = data;
    });
  }

  setOZP() {
    this.hsm.writeValue('ozp', this.hsmData.ozp).then(() => {
      this.snackBar.open("OZP gespeichert.");
    });
  }
}
