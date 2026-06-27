import { TitleCasePipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormatRelativePipe } from '../pipes/format-relative/format-relative.pipe';
import { regions } from '../regions';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { IonItem, IonLabel, IonText, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-instance-item',
  templateUrl: './instance-item.component.html',
  styleUrls: ['./instance-item.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormatRelativePipe,
    TitleCasePipe,
    IonItem,
    IonLabel,
    IonText,
    IonNote,
  ],
})
export class InstanceItemComponent {
  instance = input<Instance>();
  regions = signal<Regions>(regions);
  region = computed<Region>(() => this.computeRegion());
  constructor() {}

  computeRegion() {
    return this.regions().regions.filter(
      (region: any) => region.id === this.instance()?.region,
    )[0];
  }
}
