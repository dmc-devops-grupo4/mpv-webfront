import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';
import { environment } from 'src/environments/environment';
import { Config } from './config/layer.interface';
import { AuthService } from './core/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { DialogService } from './shared/services/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  config: Config;
  isProduction: boolean

  constructor(
    private readonly configService: ConfigService,
    private readonly loading: LoadingService,
    private readonly authService: AuthService,
    private readonly dialogService: DialogService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.configService.config.subscribe((config: any) => {
      this.config = config;
    });
    this.isProduction = environment.production
  }

  get SpinnerText() {
    return this.loading.textoSpinner
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
