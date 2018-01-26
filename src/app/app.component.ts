import { Component } from '@angular/core';
import { HsmService } from './services/hsm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private hsm: HsmService) {}

  ozp: string;

  ngOnInit() {
    this.hsm.readValue('ozp').then(ozp => {
      console.log(ozp);
      this.ozp = ozp;
    });
  }
}
