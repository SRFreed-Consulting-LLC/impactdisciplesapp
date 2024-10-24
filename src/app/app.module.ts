import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FeaturesModule } from './features/features.module';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { LayoutsModule } from 'impactdisciplescommon/src/layouts/layouts.module';
import { ImpactDisciplesModule } from 'impactdisciplescommon/src/impactdisciples.common.module';
import { FormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ServiceWorkerModule.register('firebase-messaging-sw.js', {
    //   enabled: !isDevMode(),
    //   scope: environment.domain,
    //   registrationStrategy: 'registerWhenStable:20000'
    // }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      scope: environment.domain,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    ToastrModule.forRoot(),
    CoreModule,
    FeaturesModule,
    AdminModule,
    FormsModule,
    LayoutsModule,
    ImpactDisciplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
