import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() createdAt: Date | null = null;
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() addItem: EventEmitter<{ value: string, createdAt: Date }> = new EventEmitter<{ value: string, createdAt: Date }>();

  onDelete(){
    this.delete.emit();
  }
  listItems: { value: string, createdAt: Date }[] = [
    { value: 'Clean house', createdAt: new Date() },
    { value: 'Do Homework', createdAt: new Date() }
  ];
  dataSource: MatTableDataSource<{value:string, createdAt: Date}>;
  todoForm: FormGroup;
  selectedItem: string | null = null;

  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required, this.whiteSpaceValidator]]
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }
  addItems() {
    if (this.todoForm?.valid) {
      const newItem = {
        value: this.todoForm.get('newItem')?.value,
        createdAt: new Date()
      };
      this.addItem.emit(newItem);
      console.log(newItem)
      this.todoForm.reset();
      this.router.navigate(['/list']);
    }
  }
  
  goBack(): void {
    this.location.back();
  }


  whiteSpaceValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;
    if (value && value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  };
}
