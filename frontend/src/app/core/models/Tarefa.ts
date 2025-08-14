import Situacao from '../enums/Situacao';
import Prioridade from '../enums/Prioridade';
import Usuario from './Usuario';

interface Tarefa {
    id: string;
    titulo: string;
    descricao: string;
    responsavel: Usuario;
    prioridade: Prioridade;
    status: Situacao;
    deadline: string;
}

export default Tarefa;
