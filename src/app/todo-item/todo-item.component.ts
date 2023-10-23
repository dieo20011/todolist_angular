import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() createdAt: Date | null = null;
  @Input() index: number = 0;
  @Input() selectedLanguage: string = ''; 
  @Output() addItem: EventEmitter<{ value: string, createdAt: Date }> = new EventEmitter<{ value: string, createdAt: Date }>();
  @Output() updateItems: EventEmitter<{ index: number, value: string }> = new EventEmitter();

  isUpdating: boolean = false;
  listItems: { value: string, createdAt: Date }[] = [
    { value: 'Clean house', createdAt: new Date() },
    { value: 'Do Homework', createdAt: new Date() }
  ];
  dataSource: MatTableDataSource<{ value: string, createdAt: Date }>;
  todoForm: FormGroup;
  selectedItem: string | null = null;

  constructor(private formBuilder: FormBuilder, private location: Location, private router: Router, private route: ActivatedRoute,  private translate: TranslateService) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required, this.whiteSpaceValidator]]
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params['index'])
    ).subscribe(index => {
      this.index = index;
    });
  
    this.route.queryParams.subscribe(params => {
      const item = params['item'];
      if (item && typeof item === 'string') {
        this.todoForm.get('newItem')?.setValue(item);
        this.isUpdating = true; 
      }
    });
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
    }
  }
  //addItem 
  addItems() {
    if (this.todoForm?.valid) {
      const newItem = {
        value: this.todoForm.get('newItem')?.value,
        createdAt: new Date()
      };
      const params: Params = {
        value: newItem.value,
        createdAt: newItem.createdAt.toISOString()
      };
      this.router.navigate(['/list'], { queryParams: params });
      console.log(params)
      this.addItem.emit(newItem);
      this.todoForm.reset();
    }
  }
  getUpdatedItem() {
    return {
      value: this.todoForm.get('newItem')?.value,
    };
  }
  //updateItem push queryParams to list and display it on URL
  updateItem() {
    const updatedItem = this.getUpdatedItem();
    const queryParams = {
      index: this.index,
      value: updatedItem.value
    };
  
    this.updateItems.emit(queryParams);
    console.log(queryParams);
    this.router.navigate(['/list'], { queryParams });
  }
  //clear query URL
  clearQueryParams() {
    const queryParams: Params = { value: null, createdAt: null };
    this.router.navigate([], { queryParams });
  }
  //back to previous URL
  goBack(): void {
    this.location.back();
  }
  //check whitespace
  whiteSpaceValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;
    if (value && value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  };
}
