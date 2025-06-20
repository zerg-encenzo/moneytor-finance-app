import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

interface confirmAlertParameters {
  header?: string | null;
  subHeader?: string | null;
  message?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alert: AlertController
  ) { }

  async confirm(params: confirmAlertParameters): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alert.create({
        header: params.header || "Confirm",
        subHeader: params.subHeader || undefined,
        message: params.message || undefined,
        buttons: [
          {
            text: "Cancel",
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: "OK",
            role: 'confirm',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });
  }
}
