import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators, AbstractControl, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  listItems: string[] = ['Clean house', 'Do Homework'];
  todoForm: FormGroup;
  selectedItem: string | null = null;
  
  constructor(private formBuilder: FormBuilder){
    this.todoForm = this.formBuilder.group({
      newItem: ['',[Validators.required, this.whiteSpaceValidator]]
    })
  }
  editItem(item:string){
    this.selectedItem = item;
    this.todoForm.patchValue({newItem: item});
  }
  addItem(){
    const valueItem = this.todoForm.get('newItem');
    if(valueItem && valueItem.valid){
      const newValueItem = valueItem.value;
      this.listItems.unshift(newValueItem);
      this.todoForm.reset();
    }
  }

  deleteItem(item:string){
    const index = this.listItems.indexOf(item);
    if(index > -1){
      this.listItems.splice(index, 1);
    }
  }

whiteSpaceValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;
    if (value && value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  };
  
}
