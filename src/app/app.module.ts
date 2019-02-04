import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { MapviewPage } from '../pages/mapview/mapview';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapsProvider } from '../providers/maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { OptionsPage } from '../pages/options/options';
import { RoutesPage } from '../pages/routes/routes';
import { RoutesCreatePage } from '../pages/routes-create/routes-create';
import { RoutesProvider } from '../providers/routes/routes';
import { CallbackPipe } from './pipes/callback.pipe';
import { RoutesInspectPage } from '../pages/routes-inspect/routes-inspect';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    MapviewPage,
    OptionsPage,
    RoutesPage,
    RoutesCreatePage,
    RoutesInspectPage,
    CallbackPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    MapviewPage,
    OptionsPage,
    RoutesPage,
    RoutesCreatePage,
    RoutesInspectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapsProvider,
    HttpClientModule,
    Geolocation,
    RoutesProvider
  ]
})
export class AppModule {}
