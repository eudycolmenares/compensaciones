import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ToastComponent } from './components/toast/toast.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { LoadingInterceptor } from './services/interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    SpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbToastModule
  ],
  exports: [
    ToastComponent,
    SpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
