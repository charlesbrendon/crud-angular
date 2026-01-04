import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Certifique-se que o nome da classe é App

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
