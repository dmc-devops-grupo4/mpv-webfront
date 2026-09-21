import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from './layer.interface';
import { APP_CONFIG } from './token';

@NgModule()
export class ConfigModule {
  static forRoot(config : Config) : ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [{ provide: APP_CONFIG, useValue: config }],
    }
  }
}
