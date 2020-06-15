import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { CalendarViewComponent } from './layout/calendar-view/calendar-view.component';
import { FooterViewComponent } from './layout/footer-view/footer-view.component';
import { CurrentViewComponent } from './layout/current-view/current-view.component';
import { DetailsViewComponent } from './layout/details-view/details-view.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalendarViewComponent,
    DetailsViewComponent,
    CurrentViewComponent,
    FooterViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
