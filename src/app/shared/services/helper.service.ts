import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
  }

  jsonToFormData(data: any): FormData {
    const formData = new FormData();
    this.buildFormData(formData, data);
    return formData;
  }

  private buildFormData(formData: FormData, data: any, parentKey:any = undefined): void {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      let separationOpen = '';
      let separationClose = '';
      Object.keys(data).forEach((key: any) => {
        if (isNaN(key) === true) {// es letra
          separationOpen = '.';
          separationClose = '';
        } else {// es número
          separationOpen = '[';
          separationClose = ']';
        }
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}${separationOpen}${key}${separationClose}` : key);
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

}
