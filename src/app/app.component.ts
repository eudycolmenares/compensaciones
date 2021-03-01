import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { PrimeNGConfig } from 'primeng/api';

import { LoadingService } from './services/loading/loading.service';
import { languagePrimeNG } from './libraries/utilities.library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false;

  constructor(
    private loadingSvc: LoadingService,
    private configPNG: PrimeNGConfig
  ){
    this.listenToLoading();
    this.configPNG.setTranslation(languagePrimeNG);
  }

  listenToLoading(): void {
    this.loadingSvc.loading$
    .pipe(delay(0))
    .subscribe((loading: boolean) => this.loading = loading);
  }
}
