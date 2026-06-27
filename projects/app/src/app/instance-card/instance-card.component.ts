import { Component, OnInit, computed, input, signal } from '@angular/core';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { regions } from '../regions';
import {
  IonItem,
  IonCard,
  IonLabel,
  IonText,
  IonNote,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { AppComponent } from '../app.component';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';

@Component({
  selector: 'app-instance-card',
  templateUrl: './instance-card.component.html',
  styleUrls: ['./instance-card.component.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonNote,
    IonText,
    IonLabel,
    IonCard,
    IonItem,
    RouterLink,
    FormatRelativePipe,
  ],
})
export class InstanceCardComponent {
  instance = input<Instance>();
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  constructor(public app: AppComponent) {}

  computeRegion() {
    return this.regions().regions.filter(
      (region: any) => region.id === this.instance()?.region,
    )[0];
  }
}
