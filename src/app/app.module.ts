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
import { SidenavService } from './services/sidenav-details.service';
import { MeetingsService } from './services/meetings.service';
import { ClockService } from './services/clock.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SidenavService,
              ClockService,
              MeetingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
