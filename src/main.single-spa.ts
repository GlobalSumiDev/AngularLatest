/*import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { registerApplication, start } from 'single-spa';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Register Angular app (all routes except /react)
registerApplication({
  name: 'angular-app',
  app: async () => {
    const appRef = await bootstrapApplication(AppComponent, appConfig);
    return {
      bootstrap: async () => {},
      mount: async () => {},
      unmount: async () => appRef.destroy(),
    };
  },
  activeWhen: (location) => !location.pathname.startsWith('/react'),
});

// Register React app (only /react routes)
registerApplication({
  name: 'react-app',
  app: () => import('./react-app/react-spa'),
  activeWhen: ['/react'],
});

// Start single-spa
start();*/
/*console.log('=== MAIN.SINGLE-SPA.TS STARTED ===');

import { registerApplication, start, getAppStatus } from 'single-spa';
console.log('Single-SPA imported successfully');

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('About to register React app...');

registerApplication({
  name: '@your-app/react-app',
  app: () => {
    console.log('🚀 Loading React app module...');
    return import('./react-app/react-spa').then(module => {
      console.log('✅ React module loaded:', module);
      return module;
    }).catch(err => {
      console.error('❌ Failed to load React module:', err);
      throw err;
    });
  },
  activeWhen: (location) => {
    const isActive = location.pathname === '/welcomePage';
    console.log('🔍 Checking if React should be active:', {
      pathname: location.pathname,
      isActive
    });
    return isActive;
  }
});

console.log('React app registered');

console.log('Starting Single-SPA...');
start();
console.log('Single-SPA started');

// Expose properly to window for debugging
(window as any).singleSpa = {
  getAppStatus: () => getAppStatus('@your-app/react-app'),
  currentPath: () => window.location.pathname
};

console.log('Bootstrapping Angular...');
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Angular bootstrap error:', err));*/



  import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { registerApplication, start } from 'single-spa';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Register Angular app (all routes)
registerApplication({
  name: 'angular-app',
  app: async () => {
    const appRef = await bootstrapApplication(AppComponent, appConfig);
    return {
      bootstrap: async () => {},
      mount: async () => {},
      unmount: async () => appRef.destroy(),
    };
  },
  activeWhen: () => true, // Always active (for header/footer)
});

// Register React app (only /welcomePage route, mount inside #react-root)
registerApplication({
  name: 'react-app',
  app: () => import('./react-app/react-spa'),
  activeWhen: ['/welcomePage',`/addEmployee`,`/userPage`],
});

// Start single-spa
start();