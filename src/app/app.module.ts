import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { LoadingInterceptor } from './services/interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule
  ],
  exports: [
    SpinnerComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
