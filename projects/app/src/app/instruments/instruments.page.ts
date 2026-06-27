import { Component, computed, signal } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Instrument, InstrumentType } from '../interfaces/oanda';
// import Fuse from 'fuse.js';
import { AppComponent } from '../app.component';
import { ItemSkeletonComponent } from '../item-skeleton/item-skeleton.component';
import { TitleCasePipe } from '@angular/common';
import { InstrumentItemComponent } from '../instrument-item/instrument-item.component';
import { orderBy } from 'lodash-es';
import { addIcons } from 'ionicons';
import { closeCircle } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonContent,
  IonItem,
  IonLabel,
  IonChip,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
  standalone: true,
  imports: [
    ItemSkeletonComponent,
    TitleCasePipe,
    InstrumentItemComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonContent,
    IonItem,
    IonLabel,
    IonChip,
    IonList,
  ],
})
export class InstrumentsPage {
  instruments = computed(() => this.computeInstruments());
  instrumentType = signal<InstrumentType | undefined>(undefined);
  instrumentTypes = signal<InstrumentType[]>(['CFD', 'CURRENCY', 'METAL']);
  searchPattern = '';
  results: any;
  // results: Fuse.FuseResult<Instrument>[] = [];
  isEmpty = false;
  isEnd = false;
  constructor(
    public app: AppComponent,
    private modalController: ModalController,
  ) {
    addIcons({ closeCircle });
  }

  computeInstruments() {
    return orderBy(
      this.instrumentType()
        ? this.app
            .instruments()
            ?.filter((i) => i.type === this.instrumentType())
        : this.app.instruments(),
      (i) => i.displayName,
    );
  }

  selectInstrument(instrument: Instrument) {
    this.modalController.dismiss(instrument);
  }

  searchInstruments(event: any) {
    // const {
    //   detail: { value },
    // } = event;
    // const options = {
    //   // isCaseSensitive: false,
    //   // includeScore: false,
    //   // shouldSort: true,
    //   // includeMatches: false,
    //   // findAllMatches: false,
    //   // minMatchCharLength: 1,
    //   // location: 0,
    //   threshold: 0.4,
    //   // distance: 100,
    //   // useExtendedSearch: false,
    //   // ignoreLocation: false,
    //   // ignoreFieldNorm: false,
    //   keys: ['displayName', 'name'],
    // };
    // const fuse = new Fuse(this.instruments, options);
    // this.results = fuse.search(value);
  }

  trackInstruments(_index: number, instrument: Instrument) {
    return instrument.name;
  }

  dismiss(instrument?: Instrument) {
    this.modalController.dismiss(instrument ? instrument : undefined);
  }
}
