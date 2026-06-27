import { Injectable, computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Auth,
  authState,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  updateProfile,
  updateEmail,
  getAuth,
  User as FirebaseUser,
  sendEmailVerification,
  IdTokenResult,
} from '@angular/fire/auth';
import { docData, doc, Firestore, deleteDoc } from '@angular/fire/firestore';
import {
  NavController,
  AlertController,
  ToastOptions,
} from '@ionic/angular/standalone';
// import { BadgeService } from '../badge/badge.service';
import { Settings, User } from '../../interfaces/user';
import { Device } from '@capacitor/device';
import { LoadingService } from '../loading/loading.service';
import { ToastService } from '../toast/toast.service';
import { PreferencesService } from '../preferences/preferences.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null | undefined>(undefined);
  token = signal<string | undefined>(undefined);
  settings = signal<Settings | null | undefined>(undefined);
  profile = signal<FirebaseUser | undefined | null>(undefined);
  idToken = signal<IdTokenResult | undefined>(undefined);

  // computes
  isAdmin = computed(() => this.idToken()?.claims?.['admin']);
  hasApiKey = computed(() => this.settings()?.oanda?.credentials?.apiKey);
  credentials = computed(() => this.settings()?.oanda?.credentials);
  hasAccountId = computed(() => this.settings()?.oanda?.credentials?.accountId);
  constructor(
    private auth: Auth,
    // private badgeService: BadgeService,
    private nav: NavController,
    private firestore: Firestore,
    private alert: AlertController,
    private loading: LoadingService,
    private toast: ToastService,
    private preferences: PreferencesService,
    private analytics: AnalyticsService,
  ) {
    this.getUser();
    this.getSettings();
  }

  getUser() {
    authState(this.auth)
      .pipe(
        switchMap((user) => {
          this.profile.set(user);
          this.analytics.setUserId({ userId: user ? user?.uid! : null! });
          if (user) this.getIdTokenResult();
          return user
            ? docData<any>(doc(this.firestore, `users/${user.uid}`), {
                idField: 'uid',
              })
            : of(null);
        }),
      )
      .subscribe((user: User | null) => this.user.set(user));
  }

  async getIdTokenResult() {
    this.idToken.set(await getAuth()?.currentUser?.getIdTokenResult(true));
  }

  getSettings() {
    authState(this.auth)
      .pipe(
        switchMap((user) => {
          return user
            ? docData<any>(doc(this.firestore, `settings/${user.uid}`))
            : of(null);
        }),
      )
      .subscribe((settings: Settings | null) => {
        if (settings || settings === null) SplashScreen.hide();

        this.settings.set(settings);

        if (
          !settings?.oanda?.credentials?.apiKey ||
          !settings?.oanda?.credentials?.accountId
        ) {
          this.navigateRoot();
        }
      });
  }

  // set _token(token: string) {
  //   this.token.set(token);
  // }

  // get _token() {
  //   return this.token()!;
  // }

  async updatePassword(password: string) {
    try {
      await updatePassword(getAuth().currentUser!, password);
    } catch (e) {}
  }

  async sendEmailVerification() {
    try {
      await sendEmailVerification(this.auth.currentUser!);
    } catch (error) {}
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {}
  }

  async deleteUser() {
    const alert = await this.alert.create({
      header: 'Delete Account',
      subHeader: 'This action is not reversible.',
      message:
        'All information related to this account will be deleted permanently.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await this.loading.present({ message: 'Deleting account...' });
              await deleteUser(getAuth().currentUser!);
              this.loading.dismiss();
              this.navigateRoot();
            } catch (error) {
              this.toast.present({ message: 'Failed to delete account.' });
              this.loading.dismiss();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      const options: ToastOptions = {
        message: 'Your account has been created',
        icon: 'checkmark',
      };
      await createUserWithEmailAndPassword(this.auth, email, password);
      await this.sendEmailVerification();
      await this.toast.present(options);
    } catch (e) {
      await this.presentAlert('Error', (e as any).code);
    }
  }

  async updateProfile({
    displayName,
    photoURL,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }) {
    const { currentUser } = getAuth();
    if (currentUser)
      await updateProfile(currentUser, { displayName, photoURL });
  }

  async updateEmail(newEmail: string) {
    const { currentUser } = getAuth();
    if (currentUser) await updateEmail(currentUser, newEmail);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const options: ToastOptions = {
        message: 'You have been signed in.',
        icon: 'checkmark',
      };
      await this.loading.present();
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.loading.dismiss();
      await this.toast.present(options);
    } catch (e) {
      await this.loading.dismiss();
      await this.presentAlert('Error', (e as any).code);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async signOut() {
    await this.loading.present({ message: 'Signing out...' });
    try {
      const { platform } = await Device.getInfo();
      if (platform !== 'web') {
        await deleteDoc(doc(this.firestore, `devices/${this.token}`));
        // await this.notificationsService.removeAllDeliveredNotifications();
        // await this.badgeService.clear();
      }
      await signOut(this.auth);
      this.preferences.clear();
      this.navigateRoot();
      // this.presentModal();
      await this.loading.dismiss();
    } catch (e) {
      await this.loading.dismiss();
    }
  }

  navigateRoot() {
    this.nav.navigateRoot('');
  }
}
