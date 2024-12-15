import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Bu, servisi global olarak erişilebilir yapar
})
export class StorageService {
  saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data)); // Veriyi localStorage'a kaydeder
  }

  getData(key: string): any {
    const data = localStorage.getItem(key); // localStorage'dan veriyi alır
    return data ? JSON.parse(data) : []; // Veriyi JSON formatında döndürür
  }

  //clearData(key: string): void {
  //localStorage.removeItem(key); // Veriyi localStorage'dan siler
  //}
}
