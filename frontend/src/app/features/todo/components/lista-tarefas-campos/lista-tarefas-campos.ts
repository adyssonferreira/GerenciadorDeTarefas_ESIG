import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Button} from "primeng/button";
import {InputText} from "primeng/inputtext";
import Situacao from '../../../../core/enums/Situacao';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import Option from '../../../../shared/types/Option';
import BuscaFiltro from '../../../../core/models/BuscaFiltro';

@Component({
    selector: 'app-lista-tarefas-campos',
    imports: [
        Button,
        InputText,
        Select,
        FormsModule
    ],
    templateUrl: './lista-tarefas-campos.html',
    styleUrl: './lista-tarefas-campos.scss'
})
export class ListaTarefasCampos implements OnInit {
    @Output() filtrar = new EventEmitter<BuscaFiltro>();

    situacoes: Option[] = [
        {label: 'Todas', value: Situacao.TODAS},
        {label: 'Aberto', value: Situacao.ABERTA},
        {label: 'Finalizada', value: Situacao.FINALIZADA},
        {label: 'Cancelada', value: Situacao.CANCELADA}
    ]

    usuarios: Option [] = []

    filtro: BuscaFiltro = {
        numero: null,
        termo: null,
        responsavelId: null,
        situacao: Situacao.TODAS
    }

    ngOnInit() {
        //busca de usuarios
    }

    buscarTarefas() {
        this.filtrar.emit(this.filtro);
    }
}
