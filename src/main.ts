/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/

  /*import { registerApplication, start } from 'single-spa';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


registerApplication({
  name: '@your-app/react-app',
  app: () => import('./react-app/react-spa'),
  activeWhen: ['/welcomePage']
});

// Start Single-SPA
start();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/


  console.log('=== MAIN.TS STARTED ===');

import { registerApplication, start } from 'single-spa';
console.log('Single-SPA imported:', { registerApplication, start });

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('About to register React app...');

registerApplication({
  name: '@your-app/react-app',
  app: () => {
    console.log('Loading React app module...');
    return import('./react-app/react-spa');
  },
  activeWhen: ['/welcome']
});

console.log('React app registered');

// Start Single-SPA
console.log('Starting Single-SPA...');
start();
console.log('Single-SPA started');

// Expose to window for debugging
(window as any).singleSpa = { registerApplication, start };

console.log('Bootstrapping Angular...');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Angular bootstrap error:', err));
