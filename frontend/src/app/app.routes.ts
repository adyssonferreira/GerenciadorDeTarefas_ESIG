import {Routes} from '@angular/router';
import {LoginPage} from './features/auth/pages/login-page/login-page';
import {ListaTarefasPage} from './features/todo/pages/lista-tarefas-page/lista-tarefas-page';
import authGuard from './core/guards/auth-guard';

export const routes: Routes = [
    {path: "", redirectTo: "/login", pathMatch: "full"},
    {path: "login", component: LoginPage},
    {path: "tarefas", canActivate:[ authGuard ], component: ListaTarefasPage}
];
