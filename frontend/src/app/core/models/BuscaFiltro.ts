type BuscaFiltro = {
    numero: number | null;
    termo: string | null;
    responsavelId: string | null;
    situacao: string | null;
    prioridade: string | null;
}

export function getIntialBuscaFiltro(): BuscaFiltro {
    return {
        numero: null,
        termo: null,
        responsavelId: null,
        situacao: null,
        prioridade: null
    } as BuscaFiltro;
}

export default BuscaFiltro;
