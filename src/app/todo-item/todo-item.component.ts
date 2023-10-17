import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() title:string = '';
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  onDelete(){
    this.delete.emit();
  }
}
