import { Router, Params } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FAKE_DATA } from '../data.const';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  listItems: { value: string, createdAt: Date }[] = FAKE_DATA;
  languages: { value: string }[] = [{ value: 'English' }, { value: 'Vietnamese' }];
  dataSource: MatTableDataSource<{ value: string, createdAt: Date }>;
  todoForm: FormGroup;
  selectedItemIndex: number | null = null;
  searchText: string = '';
  index: number = 0;
  moment: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }

  ngOnInit() {
    // for add feature
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
        this.clearQueryParams();
      }
    });

    this.route.queryParams.subscribe(params => {
      const index = params['index'];
      const value = params['value'];
      if (index && value) {
        this.updateItem(Number(index), value);
        this.clearQueryParams();
      }
    }); 
    // for search feature
    this.todoForm.get('newItem')?.valueChanges.subscribe(value => {
      this.searchText = value;
      this.applyFilter();
    });
    // for translate feature
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
  updateItem(index: number, value: string) {
    const foundItem = this.listItems[index];
    if (foundItem) {
      foundItem.value = value;
      this.dataSource.data = this.listItems;
    }
  }
  onLanguageChange(lang: string) {
    if (lang === 'English') {
      this.changeLanguage('en');
    } else if (lang === 'Vietnamese') {
      this.changeLanguage('vi');
    }
  }

  //search
  applyFilter() {
    const filterValue = this.searchText.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  //delete
  deleteItem(item: { value: string, createdAt: Date }) {
    const index = this.listItems.findIndex(listItem => listItem.value === item.value);
    if (index > -1) {
      this.listItems.splice(index,1);
      this.dataSource.data = this.listItems;
    }
  }
    editItem(item: { value: string, createdAt: Date }) {
    const index = this.listItems.findIndex(listItem => listItem.value === item.value);
    if (index > -1) {
      const queryParams = { item: item.value };
      this.router.navigate(['/edit', index], { queryParams });
      console.log(item);
    }
  }
  //clear query url
  clearQueryParams() {
    const queryParams: Params = { value: null, createdAt: null };
    this.router.navigate([], { queryParams });
  }
}