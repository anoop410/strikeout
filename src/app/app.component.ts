import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { LoaderService } from './Services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
  title = 'SportsHub';
  showLoader: boolean = false;
  private subscription!: Subscription;

  constructor(private loaderService: LoaderService, private ref: ChangeDetectorRef){
    setTheme('bs5');
    this.subscription = this.loaderService.loaderState$.subscribe((state) => {
      this.showLoader = state;
    });

  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
