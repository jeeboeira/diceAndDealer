import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx';
import { addIcons } from 'ionicons';
import { cubeOutline, timeOutline, personOutline, createOutline, trashOutline } from 'ionicons/icons';



bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideHttpClient(),      // fornece o HttpClient para fazer requisições HTTP
    provideRouter(routes),    // define as rotas
    importProvidersFrom(IonicStorageModule.forRoot()),
    DeviceMotion              // fornece o DeviceMotion para acessar os dados de movimento do dispositivo
  ]
});
addIcons({
  'cube-outline': cubeOutline,
  'time-outline': timeOutline,
  'person-outline': personOutline,
  'create-outline': createOutline,
  'trash-outline': trashOutline
});