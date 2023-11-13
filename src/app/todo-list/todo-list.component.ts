import { Router, Params } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FAKE_DATA } from '../data.const';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../local-storage.service';
import * as moment from 'moment';
import { UserService } from '../user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  listItems: { value: string; createdAt: Date }[] = FAKE_DATA.map((item) => ({
    value: item.value,
    createdAt: moment(item.createdAt).toDate(),
  }));
  dataSource: MatTableDataSource<{ value: string; createdAt: Date }>;

  languages: { key: string; value: string }[] = [
    { key: 'en', value: 'English' },
    { key: 'vi', value: 'Vietnamese' },
  ];

  todoForm: FormGroup;
  selectedItemIndex: number | null = null;
  selectedLanguage: string = '';
  searchText: string = '';
  index: number = 0;
  moment: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {
    this.todoForm = this.formBuilder.group({
      newItem: ['', [Validators.required]],
    });
    this.dataSource = new MatTableDataSource(this.listItems);
  }

  ngOnInit() {
    //For add feature
    this.route.queryParams.subscribe((params) => {
      const value = params['value'];
      const createdAt = params['createdAt'];
      if (value && createdAt) {
        const newItem = {
          value: value,
          createdAt: new Date(createdAt),
        };
        // Thêm newItem vào FAKE_DATA
        FAKE_DATA.unshift(newItem);
        this.clearQueryParams();
      }
    });
    // For update feature
    this.route.queryParams.subscribe((params) => {
      const index = params['index'];
      const value = params['value'];
      if (index && value) {
        this.updateItem(Number(index), value);
        this.clearQueryParams();
      }
    });
    // for search feature
    this.todoForm.get('newItem')?.valueChanges.subscribe((value) => {
      this.searchText = value;
      this.applyFilter();
    });
    // for translate feature
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    const savedLanguage = this.localStorageService.get('language');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
      this.translate.setDefaultLang(savedLanguage);
      this.translate.use(savedLanguage);
      console.log(this.selectedLanguage);
    }
  }
  //push value to /edit
  editItem(item: { value: string; createdAt: Date }) {
    const index = this.listItems.findIndex(
      (listItem) => listItem.value === item.value
    );
    if (index > -1) {
      const queryParams = { item: item.value };
      this.router.navigate(['/edit', index], { queryParams });
      console.log(item);
    }
  }
  //update Item in list
  updateItem(index: number, value: string) {
    const foundItem = this.listItems[index];
    if (foundItem) {
      foundItem.value = value;
      this.dataSource.data = this.listItems;
    }
  }
  //Feature: Change Language
  onLanguageChange(lang: string) {
    const selectedLanguage = this.languages.find(
      (language) => language.key === lang
    );
    if (selectedLanguage) {
      this.changeLanguage(selectedLanguage.key);
    }
  }
  changeLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.localStorageService.set('language', lang);
  }
  //search
  applyFilter() {
    const filterValue = this.searchText.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  //delete with index
  deleteItem(item: { value: string; createdAt: Date }) {
    const index = this.listItems.findIndex(
      (listItem) => listItem.value === item.value
    );
    if (index > -1) {
      this.listItems.splice(index, 1);
      this.dataSource.data = this.listItems;
    }
  }
  //clear query url
  clearQueryParams() {
    const queryParams: Params = { value: null, createdAt: null };
    this.router.navigate([], { queryParams });
  }

  getUserData() {
    return this.userService.getUser();
  }

  setUserData(user: any) {
    this.userService.setUser(user);
  }

  logout() {
    this.router.navigate(['/login']);
  }
  
}
