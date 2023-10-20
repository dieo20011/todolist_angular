import { Router, Params } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FAKE_DATA } from '../data.const';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  listItems: { value: string, createdAt: Date }[] = FAKE_DATA;

  dataSource: MatTableDataSource<{ value: string, createdAt: Date }>;
  todoForm: FormGroup;
  selectedItemIndex: number | null = null;
  searchText: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const value = params['value'];
      const createdAt = params['createdAt'];
      if (value && createdAt) {
        const newItem = {
          value: value,
          createdAt: new Date(createdAt)
        };
        // Thêm newItem vào FAKE_DATA
        FAKE_DATA.unshift(newItem);
        this.clearQueryParams()
      }
    });
    this.todoForm.get('newItem')?.valueChanges.subscribe(value=>{
      this.searchText = value;
      this.applyFilter();
    })
  }

  applyFilter() {
    const filterValue = this.searchText.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  deleteItem(item: { value: string, createdAt: Date }) {
    const index = this.listItems.findIndex(listItem => listItem.value === item.value);
    if (index > -1) {
      this.listItems.splice(index, 1);
      this.dataSource.data = this.listItems.slice();
      this.clearQueryParams()
    }
  }

  clearQueryParams() {
    const queryParams: Params = { value: null, createdAt: null };
    this.router.navigate([], { queryParams });
  }
}
