import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
    // Các phương thức và logic của service
  }

  set(lang: string, value: string): void {
    window.localStorage.setItem(lang, JSON.stringify(value));
  }

  get(lang: string): any {
    const value = window.localStorage.getItem(lang);
    return value ? JSON.parse(value) : null;
  }
}