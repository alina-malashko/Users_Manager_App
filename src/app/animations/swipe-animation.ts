import { animate, group, query, style, transition, trigger } from "@angular/animations";

export const swipeAnimation = trigger('routeChangeAnimation', [
  transition('MainPage => EditUserPage', swipeTo('right')),
  transition('MainPage => SignInPage', swipeTo('right')),
  transition('EditUserPage => SignInPage', swipeTo('right')),
  transition('EditUserPage => MainPage', swipeTo('left')),
  transition('SignInPage => MainPage', swipeTo('right')),
])

export function swipeTo(direction: string) {
  return [
    style({
      position: 'relative'
    }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [
      style({
        [direction]: '-100%'
      })
    ]),
    group([
      query(':leave', [
        animate(
          '300ms ease-out',
          style({
            [direction]: '100%'
          })
        ),
      ]),
      query(':enter', [
        animate('300ms ease-out', style({
          [direction]: '0%'
        })),
      ]),
    ]),
  ]
}
