import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {  todolistGuard } from './todolist-guard.guard';


const routes: Routes =[
  {path: 'list', component: TodoListComponent, canActivate: [todolistGuard], data:{rolesAllowed: ['list']}},
  {path: '', redirectTo: '/list', pathMatch: 'full'},// default route when starting web
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
