import {Component, OnInit, Output, EventEmitter, inject, Input} from '@angular/core';
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import Situacao from '../../../../core/enums/Situacao';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import Option from '../../../../shared/types/Option';
import BuscaFiltro from '../../../../core/models/BuscaFiltro';
import { UsuarioService } from '../../../../core/services/usuario.service';

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
    @Output() atualizaFiltro = new EventEmitter<BuscaFiltro>();

    private usuarioService = inject(UsuarioService);
    usuarios: Option [] = []

    situacoes: Option[] = [
        {label: 'Todas', value: Situacao.TODAS},
        {label: 'Aberto', value: Situacao.ABERTA},
        {label: 'Finalizada', value: Situacao.FINALIZADA},
        {label: 'Cancelada', value: Situacao.CANCELADA}
    ]



    ngOnInit() {
        this.fetchUsuarios();
    }

    buscarTarefas() {
        const filtro = { ...this.filtro, situacao: this.filtro.situacao ?? Situacao.TODAS, prioridade: this.filtro.prioridade ?? "T"};

        this.filtrar.emit(this.filtro);
    }

    fetchUsuarios() {
        this.usuarioService.buscarTodos().subscribe({
            next: (usuarios) => {
                this.usuarios = usuarios.map(usuario => ({
                    label: usuario.nome,
                    value: usuario.id
                }));
            },
            error: (error) => {
                console.error('Erro ao buscar usuários:', error);
            }
        });
    }
}
