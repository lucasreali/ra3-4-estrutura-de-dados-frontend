// Configuração da API
const API_BASE_URL = 'http://localhost:8080/api/jogos';

// Tipos TypeScript
export interface Jogo {
    titulo: string;
    genero: string;
    lancamento: string; // formato: YYYY-MM-DD
}

export interface CriarJogoRequest {
    titulo: string;
    genero: string;
    lancamento: string; // formato: YYYY-MM-DD
}

export interface OrdenarRequest {
    criterio: 'titulo' | 'genero' | 'ano';
}

export interface OrdenarResponse {
    algoritmo: string;
    criterio: string;
    tempoExecucaoMicros: number;
    jogos: Jogo[];
}

// Funções de requisição

/**
 * Cria um novo jogo na biblioteca
 */
export const criarJogo = async (jogo: CriarJogoRequest): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jogo),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao criar jogo');
    }

    return await response.text();
};

/**
 * Lista todos os jogos cadastrados
 */
export const listarJogos = async (): Promise<Jogo[]> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Erro ao listar jogos');
    }

    return await response.json();
};

/**
 * Ordena os jogos usando o algoritmo Bubble Sort
 */
export const ordenarComBubbleSort = async (
    criterio: OrdenarRequest['criterio']
): Promise<OrdenarResponse> => {
    const response = await fetch(`${API_BASE_URL}/ordenar/bubble-sort`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criterio }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao ordenar com Bubble Sort');
    }

    return await response.json();
};

/**
 * Ordena os jogos usando o algoritmo Insertion Sort
 */
export const ordenarComInsertionSort = async (
    criterio: OrdenarRequest['criterio']
): Promise<OrdenarResponse> => {
    const response = await fetch(`${API_BASE_URL}/ordenar/insertion-sort`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criterio }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao ordenar com Insertion Sort');
    }

    return await response.json();
};

/**
 * Ordena os jogos usando o algoritmo Quick Sort
 */
export const ordenarComQuickSort = async (
    criterio: OrdenarRequest['criterio']
): Promise<OrdenarResponse> => {
    const response = await fetch(`${API_BASE_URL}/ordenar/quick-sort`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criterio }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao ordenar com Quick Sort');
    }

    return await response.json();
};

/**
 * Função genérica para ordenar com qualquer algoritmo
 */
export const ordenarJogos = async (
    algoritmo: 'bubble-sort' | 'insertion-sort' | 'quick-sort',
    criterio: OrdenarRequest['criterio']
): Promise<OrdenarResponse> => {
    switch (algoritmo) {
        case 'bubble-sort':
            return ordenarComBubbleSort(criterio);
        case 'insertion-sort':
            return ordenarComInsertionSort(criterio);
        case 'quick-sort':
            return ordenarComQuickSort(criterio);
        default:
            throw new Error('Algoritmo inválido');
    }
};

/**
 * Deleta um jogo da biblioteca pelo nome
 */
export const deletarJogo = async (nomeJogo: string): Promise<string> => {
    const response = await fetch(
        `${API_BASE_URL}/${encodeURIComponent(nomeJogo)}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Erro ao deletar jogo');
    }

    return await response.text();
};
