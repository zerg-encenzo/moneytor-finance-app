import { Component, OnInit, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonGrid, IonRow, IonCol, IonButton, IonDatetimeButton, IonModal, IonDatetime, IonLabel, IonItem, IonText, IonButtons, IonBackdrop } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonBackdrop, IonButtons, IonText, IonItem, IonLabel, IonDatetime, IonModal, IonDatetimeButton, IonButton, IonCol, IonRow, IonGrid, IonIcon, IonHeader, IonHeader, IonToolbar, IonTitle],
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
