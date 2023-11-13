import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('LoginPageComponent <=> RegisterPageComponent', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ opacity: 0 })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
      query(':enter', [animate('300ms ease-out', style({ opacity: 1 }))])
    ]),
    query(':enter', animateChild())
  ]),
  // Define more transitions/animations as needed
]);