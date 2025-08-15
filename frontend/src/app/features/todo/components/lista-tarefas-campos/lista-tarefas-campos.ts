import {Component, OnInit, Output, EventEmitter, inject, Input, signal} from '@angular/core';
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import Situacao from '../../../../core/enums/Situacao';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import Option from '../../../../shared/types/Option';
import BuscaFiltro from '../../../../core/models/BuscaFiltro';
import { UsuarioService } from '../../../../core/services/usuario.service';
import ModoAcao from '../../../../shared/types/ModoAcao';

@Component({
    selector: 'app-lista-tarefas-campos',
    imports: [
        Button,
        InputText,
        Select,
        FormsModule,
    ],
    templateUrl: './lista-tarefas-campos.html',
    styleUrl: './lista-tarefas-campos.scss'
})
export class ListaTarefasCampos implements OnInit {
    @Input() filtro!: BuscaFiltro;
    @Output() filtrar = new EventEmitter<BuscaFiltro>();

    private usuarioService = inject(UsuarioService);
    usuarios: Option [] = []
    usuarioSelecionado: Option | null = null;


    situacoes: Option[] = [
        {label: 'Todas', value: Situacao.TODAS},
        {label: 'Aberta', value: Situacao.ABERTA},
        {label: 'Finalizada', value: Situacao.FINALIZADA},
    ]
    situacaoSelecionada: Option | null = null;

    ngOnInit() {
        this.fetchUsuarios();
    }

    emitirFiltro() {
        const filtro = {
            ...this.filtro,
            situacao: this.situacaoSelecionada?.value ?? null,
            prioridade: this.filtro.prioridade ?? null,
            responsavelId: this.usuarioSelecionado?.value != "TODOS" ? (this.usuarioSelecionado?.value ?? null) : null
        } as BuscaFiltro;

        this.filtrar.emit(filtro);
    }

    fetchUsuarios() {
        this.usuarioService.buscarTodos().subscribe({
            next: (usuarios) => {
                this.usuarios = usuarios.map(usuario => ({
                    label: usuario.nome,
                    value: usuario.id
                }));

                this.usuarios.unshift({
                    label: 'Todos',
                    value: "TODOS"
                })
            },
            error: (error) => {
                console.error('Erro ao buscar usuários:', error);
            }
        });
    }
}
