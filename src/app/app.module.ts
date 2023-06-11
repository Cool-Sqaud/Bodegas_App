import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { SecureComponent } from './secure/secure.component';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/login/login.component';
import { LogoutComponent } from './public/logout/logout.component';
import { UserAdministrationComponent } from './secure/user-administration/user-administration.component';
import { HumidityComponent } from './secure/humidity/humidity.component';
import { TemperatureComponent } from './secure/temperature/temperature.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { AdminDashboardComponent } from './secure/admin-dashboard/admin-dashboard.component';
import { TemperatureHistoryComponent } from './secure/temperature/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SecureComponent,
    PublicComponent,
    LoginComponent,
    LogoutComponent,
    UserAdministrationComponent,
    HumidityComponent,
    TemperatureComponent,
    DashboardComponent,
    AdminDashboardComponent,
    TemperatureHistoryComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    ScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
