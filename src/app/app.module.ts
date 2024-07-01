import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FeaturesModule } from './features/features.module';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from 'impactdisciplescommon/src/forms/forms.module';
import { ImpactDisciplesModule } from 'impactdisciplescommon/src/impactdisciples.common.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ToastrModule.forRoot(),
    FeaturesModule,
    AdminModule,
    FormsModule,
    ImpactDisciplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
