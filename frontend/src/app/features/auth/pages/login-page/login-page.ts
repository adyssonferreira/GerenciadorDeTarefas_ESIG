import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {MessageService} from 'primeng/api';
import {AutenticacaoService} from '../../../../core/services/autenticacao.service';
import {Toast} from 'primeng/toast';
import {finalize} from 'rxjs';
import accessToken from '../../../../core/models/AccessToken';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    imports: [
        ButtonModule,
        InputText,
        FormsModule,
        Toast,
        IconFieldModule,
        InputIconModule,
        ReactiveFormsModule
    ],
    providers: [MessageService],
    templateUrl: './login-page.html',
    styleUrl: './login-page.scss'
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    protected readonly loading = signal(false);

    autenticacaoService = inject(AutenticacaoService);
    router = inject(Router);

    constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
        this.loginForm = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]],
            senha: ["", Validators.required]
        })
    }

    ngOnInit(): void {
        this.loginForm.patchValue({
            email: "usuario1@exemplo.com"
        });
    }

    protected login() {
        this.loading.set(true)

        const {email, senha} = this.loginForm.value;

        this.autenticacaoService
            .gerarToken(email, senha)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (tokenKit) => {
                    this.autenticacaoService.setAccessToken(tokenKit);
                    this.router.navigate(['/tarefas']);
                },
                error: (error) => {
                    const {error: {mensagem}} = error;

                    this.messageService.add({
                        severity: 'error',
                        summary: mensagem,
                        detail: 'Verifique seu email e senha e tente novamente.'
                    });
                },
            });
    }

    get submittable(): boolean {
        return this.loginForm.valid && !this.loading();
    }
}
