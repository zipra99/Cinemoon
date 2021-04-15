import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SafePipeModule } from './pipes/safe-pipe.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyCnPgIM26VLnds2d1bnOKHwMXVTcOlCYHU',
            authDomain: 'cinemoon-movie.firebaseapp.com',
            databaseURL: 'https://cinemoon-movie.firebaseio.com',
            projectId: 'cinemoon-movie',
            storageBucket: 'cinemoon-movie.appspot.com',
            messagingSenderId: '358211555686',
            appId: '1:358211555686:web:3afbf1ff512d78e71a38a7',
            measurementId: 'G-KQCVZ4W8J8'
        }),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        SafePipeModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
