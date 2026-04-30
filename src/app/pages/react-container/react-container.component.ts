/*import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-react-container',
  standalone: true,
  template: '<div id="react-root"></div>',
  styles: [`
    #react-root {
      width: 100%;
      min-height: 100vh;
    }
  `]
})
export class ReactContainerComponent implements OnInit, OnDestroy {
  
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // The React app will mount here automatically via Single-SPA
  }

  ngOnDestroy() {
    // Single-SPA will handle unmounting
  }
}*/

/*import { Component } from '@angular/core';

@Component({
  selector: 'app-react-container',
  standalone: true,
  template: '<div id="react-root"></div>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    
    #react-root {
      width: 100%;
      margin: 0;
      padding: 0;
    }
  `]
})
export class ReactContainerComponent {
  constructor() {}
}*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-react-container',
  standalone: true,
  template: '<div id="react-root"></div>',
})
export class ReactContainerComponent {}