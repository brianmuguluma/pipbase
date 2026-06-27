import { SlicePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { StripeService } from '../services/stripe/stripe.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { CameraService } from '../services/camera/camera.service';
import { StorageService } from '../services/storage/storage.service';
import { Photo } from '@capacitor/camera';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [SlicePipe, FormsModule, ReactiveFormsModule, AvatarComponent],
})
export class ProfileComponent {
  selectedTab = 'profile';
  isEmail = computed(() => this.computeProvider());
  form = new FormGroup({
    displayName: new FormControl(this.auth.profile()?.displayName),
    email: new FormControl(this.auth.profile()?.email),
    password: new FormControl(''),
  });
  photo = signal<Photo | undefined>(undefined);
  constructor(
    public auth: AuthService,
    private toast: ToastService,
    private stripe: StripeService,
    private camera: CameraService,
    private storage: StorageService,
  ) {}

  computeProvider() {
    return this.auth.profile()?.providerData[0]?.providerId === 'password';
  }

  async getPhoto() {
    this.photo.set(await this.camera.getPhoto());
  }

  async uploadString() {
    return await this.storage.uploadString(this.photo()?.dataUrl!);
  }

  async update() {
    const { displayName, email, password } = this.form.value;
    if (displayName) this.updateProfile({ displayName });
    if (email) this.updateEmail(email);
    if (password) this.updatePassword(password);

    if (this.photo()) {
      await this.uploadString();
      await this.updateProfile({
        photoURL: await this.storage.getDownloadURL(),
      });

      this.clearPhoto();
    }

    this.toast.present('Your profile has been updated.');
  }

  async updateProfile({
    displayName,
    photoURL,
  }: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }) {
    await this.auth.updateProfile({ displayName, photoURL });

    if (!displayName) return;

    await this.stripe.updateCustomer({
      id: this.auth.user()?.stripeId,
      params: { name: displayName },
    });
  }

  clearPhoto() {
    this.photo.set(undefined);
  }

  async deletePhoto() {
    try {
      await this.storage.deleteObject();
      await this.auth.updateProfile({ photoURL: '' });
      this.toast.present('Your photo has been deleted.');
    } catch (error) {
      this.toast.present('Failed to delete photo.');
    }
  }

  async updateEmail(newEmail: string) {
    try {
      await this.auth.updateEmail(newEmail);
    } catch (error) {}
  }

  async updatePassword(password: string) {
    try {
      await this.auth.updatePassword(password);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAccount() {
    await this.auth.deleteUser();
  }
}
