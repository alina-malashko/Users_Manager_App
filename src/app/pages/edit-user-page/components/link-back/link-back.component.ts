import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppPath } from 'src/app/enums/routing-path-enum';

@Component({
  selector: 'app-link-back',
  templateUrl: './link-back.component.html',
  styleUrls: ['./link-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkBackComponent {

  constructor(private router: Router) {}

  public navigateToMain(): void {
    this.router.navigate([AppPath.MainFullPath]);
  }
}
