import { swipeAnimation } from './animations/swipe-animation';
import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [swipeAnimation],
})
export class AppComponent {

  public title = 'Users Manager App';

  constructor(private contexts: ChildrenOutletContexts) {}

  public getRouteAnimationState(): void {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }
}
