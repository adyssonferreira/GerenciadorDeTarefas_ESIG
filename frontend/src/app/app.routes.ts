import {Routes} from '@angular/router';
import {LoginPage} from './features/auth/pages/login-page/login-page';
import {ListaTarefasPage} from './features/todo/pages/lista-tarefas-page/lista-tarefas-page';

export const routes: Routes = [
  {path: "login", component: LoginPage},
  {path: "tarefas", component: ListaTarefasPage}
];
