import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

const routes: Routes =[
  {path: 'list', component: TodoListComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},// default route when starting web
  {path: 'add', component: TodoItemComponent},
  {path: 'edit/:index', component: TodoItemComponent}
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
