import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor() { }

  mensaje(text:string|string[]|HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      Swal.fire({
        html: text,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green'
      }).then(() => {
        resolve();
      });
    });
  }

  mensajeWarn(text:string|string[]|HTMLElement, title:string|HTMLElement=""): Promise<void> {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        html: Array.isArray(text) ? text.join(', ') : text,
        icon: 'warning',
        iconColor: 'orange',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#df2b2b'
      }).then(() => {
        resolve();
      });
    });
  }

  mensajeOk(text:string|string[]|HTMLElement, title:string|HTMLElement=""): Promise<void> {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        html: Array.isArray(text) ? text.join(', ') : text,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'green'
      }).then(() => {
        resolve();
      });
    });
  }

  mensajeOkConfirmar(text:string|string[]|HTMLElement, title:string|HTMLElement="", confirmButtonText:string="", cancelButtonText:string=""): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Swal.fire({
        title: title,
        html: Array.isArray(text) ? text.join(', ') : text,
        icon: 'success',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#b5b3b3',
        confirmButtonText: confirmButtonText !== '' ? confirmButtonText : 'Aceptar',
        cancelButtonText: cancelButtonText !== '' ? cancelButtonText : 'Cancelar',
        // reverseButtons: true
      }).then((resultado) => {
        if (resultado.value) {
          resolve();
        }
        else {
          reject();
        }
      });
    });
  }

  mensajeError(text:string|string[]|HTMLElement, title:string|HTMLElement=""): Promise<void> {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        html: Array.isArray(text) ? text.join(', ') : text,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false,
        confirmButtonColor: '#df2b2b',
      }).then(() => {
        resolve();
      });
    });
  }

  mensajeConfirmar(text:string|string[]|HTMLElement, title:string|HTMLElement="", confirmButtonText:string="", cancelButtonText:string=""): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Swal.fire({
        title: title,
        html: Array.isArray(text) ? text.join(', ') : text,
        icon: 'question',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonColor: '#2d71c5',
        cancelButtonColor: '#b5b3b3',
        confirmButtonText: confirmButtonText !== '' ? confirmButtonText : 'Aceptar',
        cancelButtonText: cancelButtonText !== '' ? cancelButtonText : 'Cancelar',
        // reverseButtons: true
      }).then((resultado) => {
        if (resultado.value) {
          resolve();
        }else {
          reject("Cancelar");
        }
      });
    });
  }

  mensajeErrorConfirmar(text: string, title: string | any = null): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Swal.fire({
        title,
        text,
        icon: 'error',
        iconHtml: '?',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showCancelButton: true,
        cancelButtonColor: '#b5b3b3',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        reverseButtons: true
      }).then((resultado) => {
        if (resultado.value) {
          resolve();
        }
        else {
          reject();
        }
      });
    });
  }

}
