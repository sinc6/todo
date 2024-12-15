export class Model {
  user: string; // 'user' için tür bilgisi
  items: TodoItem[]; // 'items' bir TodoItem dizisidir

  constructor() {
    this.user = 'Kullanıcı';
    this.items = [
      new TodoItem('Spor', true),
      new TodoItem('Kahvaltı', false),
      new TodoItem('Kitap Okumak', false),
      new TodoItem('Sinema', false),
    ];
  }
}

export class TodoItem {
  description: string; // 'description' string türündedir
  action: boolean; // 'action' boolean türündedir

  constructor(description: string, action: boolean) {
    this.description = description;
    this.action = action;
  }
}
