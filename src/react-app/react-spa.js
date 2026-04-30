

/*import React from 'react';
import { createRoot } from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './welcomePage';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: { createRoot },
  rootComponent: App,
  errorBoundary(err, info, props) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error loading React app</h2>
        <p>{err.message}</p>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;*/


import React from 'react';
import { createRoot } from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Employee from './Employee';

const RootComponent =() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcomePage" element={<App />} />
        <Route path="/addEmployee" element={<Employee />} />
      </Routes>
    </BrowserRouter>
  )
}

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: { createRoot },
  rootComponent: RootComponent,
  domElementGetter: () => {
    let element = document.getElementById('react-root');
    
    if (!element) {
      return new Promise((resolve) => {
        const checkElement = setInterval(() => {
          element = document.getElementById('react-root');
          if (element) {
            clearInterval(checkElement);
            resolve(element);
          }
        }, 50);
      });
    }
    
    return element;
  },
  errorBoundary(err, info, props) {
    return React.createElement ('div',
     { style: { padding: '20px', color: 'red' } },
      React.createElement('h2', null, 'Error loading React app'),
      React.createElement('p', null, err.message)
    ); 
  },
});

export const { bootstrap, mount, unmount } = lifecycles;