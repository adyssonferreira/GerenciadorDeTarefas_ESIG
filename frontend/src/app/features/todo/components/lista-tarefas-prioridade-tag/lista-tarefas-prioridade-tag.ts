import {Component, Input} from '@angular/core';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-lista-tarefas-prioridade-tag',
    imports: [
        Tag
    ],
  templateUrl: './lista-tarefas-prioridade-tag.html',
  styleUrl: './lista-tarefas-prioridade-tag.scss'
})
export class ListaTarefasPrioridadeTag {
    @Input() prioridade: string = "";

    get severity() {
        switch (this.prioridade) {
            case "ALTA":
                return "danger";
            case "MEDIA":
                return "warn";
            case "BAIXA":
                return "info";
            default:
                return "secondary";
        }
    }

    get label() {
        return this.prioridade.charAt(0).toUpperCase() + this.prioridade.slice(1);
    }
}
