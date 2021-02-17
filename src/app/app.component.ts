import { Component } from '@angular/core';
import {delay} from 'rxjs/operators';

import { LoadingService } from './services/loading/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  loading = false;

  constructor(private loadingSvc: LoadingService){
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingSvc.loading$
    .pipe(delay(0))
    .subscribe((loading: boolean) => this.loading = loading);
  }
}
