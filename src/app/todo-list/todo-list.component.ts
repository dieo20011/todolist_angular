import { Router } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  listItems: { value: string, createdAt: Date }[] = [
    { value: 'Clean house', createdAt: new Date() },
    { value: 'Do Homework', createdAt: new Date() }
  ];

  dataSource: MatTableDataSource<{ value: string, createdAt: Date }>;
  todoForm: FormGroup;
  selectedItemIndex: number | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }
  addItem(newItem: { value: string, createdAt: Date }) {
    console.log(newItem)
    this.listItems.unshift(newItem);
    this.dataSource.data = this.listItems.slice();
  }


  deleteItem(item: { value: string, createdAt: Date }) {
    const index = this.listItems.findIndex(listItem => listItem.value === item.value);
    if (index > -1) {
      this.listItems.splice(index, 1);
      this.dataSource.data = this.listItems.slice();
    }
  }

}
