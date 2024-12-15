import {
  ApplicationConfig,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule, // FormsModule burada eklenmeli
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
