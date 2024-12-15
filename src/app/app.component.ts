import { Component } from '@angular/core';
import { Model, TodoItem } from './model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  model = new Model();
  isDisplay = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    // Burada başlangıçta 'items' dizisini model'e doğru şekilde alıyoruz
    const savedItems = this.storageService.getData('todoItems');
    if (savedItems.length > 0) {
      this.model.items = savedItems;
    } else {
      // Eğer 'localStorage' boşsa, model'in constructor'ındaki varsayılan verileri kullanıyoruz
      this.model.items = this.model.items; // Başlangıçtaki sabit veriler
    }

    //console.log('Loaded Items from LocalStorage or Default:', this.model.items); Yüklenen veriyi kontrol edin
  }

  getName() {
    return this.model.user;
  }

  getItems() {
    if (this.isDisplay) {
      return this.model.items;
    }
    return this.model.items.filter((item) => !item.action);
  }

  addItem(value: string): void {
    if (value != '') {
      const newItem = new TodoItem(value, false);
      this.model.items.push(newItem);
      // Yeni öğeyi LocalStorage'a kaydet
      this.storageService.saveData('todoItems', this.model.items);
    }
  }
  onItemActionChange() {
    this.storageService.saveData('todoItems', this.model.items);
  }
}
