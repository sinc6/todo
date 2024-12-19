import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from './services/storage.service';
import { Model, TodoItem } from './model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('resetModal') resetModal!: TemplateRef<any>; // Modal referansını burada alıyoruz
  model = new Model();
  isDisplay = false;
  resetType: 'all' | 'completed' = 'all'; // Sıfırlama türünü belirler

  constructor(
    private storageService: StorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const savedItems = this.storageService.getData('todoItems');
    if (savedItems && savedItems.length > 0) {
      this.model.items = savedItems;
    } else {
      this.model.items = [];
    }
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
    if (value !== '') {
      const newItem = new TodoItem(value, false);
      this.model.items.push(newItem);
      this.storageService.saveData('todoItems', this.model.items);
    }
  }

  onItemActionChange() {
    this.storageService.saveData('todoItems', this.model.items);
  }

  deleteItem(index: number): void {
    this.model.items.splice(index, 1);
    this.storageService.saveData('todoItems', this.model.items);
  }

  openResetModal(type: 'all' | 'completed') {
    this.resetType = type;
    this.modalService.open(this.resetModal); // Burada modal'ı açıyoruz
  }

  confirmReset(modal: any) {
    if (this.resetType === 'all') {
      this.resetItems();
    } else if (this.resetType === 'completed') {
      this.resetCompletedItems();
    }
    modal.close(); // Modal'ı kapatıyoruz
  }

  resetItems(): void {
    this.model.items = [];
    localStorage.removeItem('todoItems');
    this.storageService.saveData('todoItems', this.model.items);
  }

  resetCompletedItems(): void {
    this.model.items = this.model.items.filter((item) => !item.action);
    this.storageService.saveData('todoItems', this.model.items);
  }
}
