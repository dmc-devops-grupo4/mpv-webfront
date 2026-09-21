import { Injectable } from '@angular/core';
import { AbstractStorage } from './storage.abstract';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends AbstractStorage {
  constructor() {
    super();
  }

  save(property: string, value: string | object) {
    const valueString = typeof value === 'object' ? this.cast(value) : value;
    localStorage.setItem(property, valueString);
  }

  get(property: string): string | null {
    return localStorage.getItem(property);
  }

  remove(property: string) {
    localStorage.removeItem(property);
  }

  clear() {
    localStorage.clear();
  }
}
