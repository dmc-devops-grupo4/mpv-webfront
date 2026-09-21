import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  textoSpinner: string

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  show(text = ''): this {
    this.textoSpinner = text !== '' ? text : 'Cargando...';
    this.spinner.show('loading');
    return this;
  }

  hide(): this {
    this.spinner.hide("loading");
    return this;
  }
}
