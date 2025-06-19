import { Component, OnInit, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonCol, IonRow, IonGrid, IonHeader, IonHeader, IonToolbar, IonTitle],
})
export class HeaderComponent  implements OnInit {

  //Inputs from "Home" Parent Component
  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

    confirmSelectedDate(event: any) {
    console.log('Selected Date:', event.detail.value);
  }

  showAlert() {
    
  }

}
