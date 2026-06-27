import { Component, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { LoginPage } from '../login/login.page';
import { AuthService } from '../services/auth/auth.service';
import { IonContent, IonText, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
  standalone: true,
  imports: [IonContent, IonText, IonButton],
})
export class FeaturesPage {
  features = signal([
    {
      title: 'Lightning Fast',
      description: `Stay ahead of the game and execute orders faster with dedicated
                servers located near the exchange; capable of millions of
                calculations per second.`,
      paths: [
        'M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z',
      ],
    },
    {
      title: 'Stable',
      description: `Harness the power of compound trading. Grow your portfolio with
                steady increments and reach exponential growth.`,
      paths: [
        `M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z`,
      ],
    },
    {
      title: 'Consistent',
      description: `We're always on the clock 24/7. Scanning and analyzing market
                opportunities without emotion, greed and impulse.`,
      paths: [
        `M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z`,
      ],
    },
    {
      title: 'Secure',
      description: `Developed with the latest technologies and best modern practises
                to keep your growing portfolio secure.`,
      paths: [
        `M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z`,
      ],
    },
    {
      title: 'Intelligent',
      description: `Leverage the power of AI and identify forming patterns and
                trends. Scan the market in real-time and spot potential
                opportunities.`,
      paths: [
        `M14 6H6v8h8V6z`,
        `M9.25 3V1.75a.75.75 0 011.5 0V3h1.5V1.75a.75.75 0 011.5 0V3h.5A2.75 2.75 0 0117 5.75v.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v1.5h1.25a.75.75 0 010 1.5H17v.5A2.75 2.75 0 0114.25 17h-.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-1.5v1.25a.75.75 0 01-1.5 0V17h-.5A2.75 2.75 0 013 14.25v-.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-1.5H1.75a.75.75 0 010-1.5H3v-.5A2.75 2.75 0 015.75 3h.5V1.75a.75.75 0 011.5 0V3h1.5zM4.5 5.75c0-.69.56-1.25 1.25-1.25h8.5c.69 0 1.25.56 1.25 1.25v8.5c0 .69-.56 1.25-1.25 1.25h-8.5c-.69 0-1.25-.56-1.25-1.25v-8.5z`,
      ],
    },
    {
      title: 'Cloud',
      description: `No additional software required. Pipbase runs in the cloud 24/7
                whilst the market is open with 99% uptime.`,
      paths: [
        `M1 12.5A4.5 4.5 0 005.5 17H15a4 4 0 001.866-7.539 3.504 3.504 0 00-4.504-4.272A4.5 4.5 0 004.06 8.235 4.502 4.502 0 001 12.5z`,
      ],
    },
  ]);
  constructor(
    public auth: AuthService,
    private modalController: ModalController,
  ) {}

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      presentingElement: await this.modalController.getTop(),
      canDismiss: true,
    });

    await modal.present();
    await modal.onDidDismiss();
    if (this.auth.user()) {
      (await this.modalController.getTop())!.canDismiss = true;
      await this.modalController.dismiss();
    }
  }
}
