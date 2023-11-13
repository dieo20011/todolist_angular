import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {  todolistGuard } from './todolist-guard.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';


const routes: Routes =[
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'list', component: TodoListComponent, canActivate: [todolistGuard], data:{rolesAllowed: ['list']}},
  {path: '', redirectTo: '/login', pathMatch: 'full'},// default route when starting web
  {path: 'add', component: TodoItemComponent, canActivate: [todolistGuard], data:{rolesAllowed: ['add']}},
  {path: 'edit/:index', component: TodoItemComponent, canActivate: [todolistGuard], data:{rolesAllowed: ['edit']}},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
