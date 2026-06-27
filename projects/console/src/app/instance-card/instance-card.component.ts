import { Component, computed, input, signal } from '@angular/core';
import { Instance, Region, Regions } from '../interfaces/vultr';
import { RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { regions } from '../regions';

@Component({
  selector: 'app-instance-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './instance-card.component.html',
  styleUrl: './instance-card.component.scss',
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
