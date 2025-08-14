import {Component, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonModule,
    InputText,
    FormsModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  protected readonly usuario = signal('');
  protected readonly senha = signal('');
  protected readonly loading = signal(false);

  protected login() {
    this.loading.set(true)
    setTimeout(() => {
      console.log("Dados:", this.usuario(), this.senha());
      this.loading.set(false)
    }, 2000)

  }
}
