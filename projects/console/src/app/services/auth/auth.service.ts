import { Injectable, computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { docData, doc, Firestore } from '@angular/fire/firestore';
import { Settings, User } from 'src/app/interfaces/user';
import { ToastService } from '../toast/toast.service';
import {
  Auth,
  authState,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  getAuth,
  User as FirebaseUser,
  IdTokenResult,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<User | null | undefined>(undefined);
  profile = signal<FirebaseUser | undefined | null>(undefined);
  settings = signal<Settings | null | undefined>(undefined);
  idToken = signal<IdTokenResult | undefined>(undefined);

  // computes
  isAdmin = computed(() => this.idToken()?.claims?.['admin']);
  hasApiKey = computed(() => this.settings()?.oanda?.credentials?.apiKey);
  hasAccountId = computed(() => this.settings()?.oanda?.credentials?.accountId);
  constructor(
    private auth: Auth,
    private router: Router,
    private toast: ToastService,
    private firestore: Firestore,
  ) {
    this.getUser();
    this.getSettings();
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      // await this.sendEmailVerification();
      this.toast.success('Your account has been created');
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

  getUser() {
    authState(this.auth)
      .pipe(
        switchMap((user) => {
          this.profile.set(user);
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
        this.settings.set(settings);

        if (
          !settings?.oanda?.credentials?.apiKey ||
          !settings?.oanda?.credentials?.accountId
        ) {
          this.navigateRoot();
        }
      });
  }

  async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (e) {}
  }

  async updateEmail(newEmail: string) {
    const { currentUser } = getAuth();
    if (currentUser) await updateEmail(currentUser, newEmail);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.toast.success('You have been signed in.');
    } catch (e) {
      await this.presentAlert('Error', (e as any).code);
    }
  }

  async presentAlert(header: string, message: string) {
    // const alert = await this.alert.create({
    //   header,
    //   message,
    //   buttons: ['OK'],
    // });
    // await alert.present();
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.navigateRoot();
      this.toast.success('You have been signed out.');
    } catch (e) {}
  }

  navigateRoot() {
    this.router.navigateByUrl('/login');
  }
}
