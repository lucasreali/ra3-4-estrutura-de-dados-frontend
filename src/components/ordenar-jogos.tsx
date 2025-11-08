import { JogosTable } from '@/components/jogos-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { OrdenarResponse } from '@/lib/api';
import { ordenarJogos } from '@/lib/api';
import { ArrowUpDownIcon, ClockIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Algoritmo = 'bubble-sort' | 'insertion-sort' | 'quick-sort';
type Criterio = 'titulo' | 'genero' | 'ano';

export const OrdenarJogos = () => {
    const [algoritmo, setAlgoritmo] = useState<Algoritmo>('quick-sort');
    const [criterio, setCriterio] = useState<Criterio>('titulo');
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState<OrdenarResponse | null>(null);

    const handleOrdenar = async () => {
        try {
            setLoading(true);
            const response = await ordenarJogos(algoritmo, criterio);
            setResultado(response);

            toast.success('Jogos ordenados com sucesso!', {
                description: `${response.algoritmo} executado em ${response.tempoExecucaoMicros}μs`,
            });
        } catch (error) {
            const mensagemErro =
                error instanceof Error
                    ? error.message
                    : 'Erro ao ordenar jogos';
            toast.error('Erro ao ordenar jogos', {
                description: mensagemErro,
            });
        } finally {
            setLoading(false);
        }
    };

    const getNomeAlgoritmo = (alg: Algoritmo): string => {
        const nomes = {
            'bubble-sort': 'Bubble Sort',
            'insertion-sort': 'Insertion Sort',
            'quick-sort': 'Quick Sort',
        };
        return nomes[alg];
    };

    const getNomeCriterio = (crit: Criterio): string => {
        const nomes = {
            titulo: 'Título',
            genero: 'Gênero',
            ano: 'Ano de Lançamento',
        };
        return nomes[crit];
    };

    return (
        <Card className='w-full max-w-4xl'>
            <CardHeader>
                <CardTitle>Ordenar Jogos</CardTitle>
                <CardDescription>
                    Compare o desempenho dos algoritmos de ordenação
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Controles de Ordenação */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Algoritmo</label>
                        <Select
                            value={algoritmo}
                            onValueChange={(value) =>
                                setAlgoritmo(value as Algoritmo)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='bubble-sort'>
                                    Bubble Sort
                                </SelectItem>
                                <SelectItem value='insertion-sort'>
                                    Insertion Sort
                                </SelectItem>
                                <SelectItem value='quick-sort'>
                                    Quick Sort
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>
                            Ordenar por
                        </label>
                        <Select
                            value={criterio}
                            onValueChange={(value) =>
                                setCriterio(value as Criterio)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='titulo'>Título</SelectItem>
                                <SelectItem value='genero'>Gênero</SelectItem>
                                <SelectItem value='ano'>
                                    Ano de Lançamento
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium invisible'>
                            Ação
                        </label>
                        <Button
                            onClick={handleOrdenar}
                            disabled={loading}
                            className='w-full'
                        >
                            <ArrowUpDownIcon />
                            {loading ? 'Ordenando...' : 'Ordenar'}
                        </Button>
                    </div>
                </div>

                {/* Informações do Resultado */}
                {resultado && (
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 bg-muted rounded-lg'>
                            <div className='space-y-1'>
                                <p className='text-sm text-muted-foreground'>
                                    Algoritmo Utilizado
                                </p>
                                <p className='text-lg font-semibold'>
                                    {resultado.algoritmo}
                                </p>
                            </div>
                            <div className='space-y-1 text-right'>
                                <p className='text-sm text-muted-foreground'>
                                    Critério de Ordenação
                                </p>
                                <p className='text-lg font-semibold'>
                                    {getNomeCriterio(
                                        resultado.criterio as Criterio
                                    )}
                                </p>
                            </div>
                            <div className='space-y-1 text-right'>
                                <p className='text-sm text-muted-foreground flex items-center gap-1 justify-end'>
                                    <ClockIcon className='size-4' />
                                    Tempo de Execução
                                </p>
                                <p className='text-lg font-semibold text-primary'>
                                    {resultado.tempoExecucaoMicros}μs
                                </p>
                            </div>
                        </div>

                        {/* Tabela de Resultados */}
                        <div>
                            <h3 className='text-sm font-medium mb-3'>
                                Resultado da Ordenação ({resultado.jogos.length}{' '}
                                {resultado.jogos.length === 1
                                    ? 'jogo'
                                    : 'jogos'}
                                )
                            </h3>
                            <JogosTable jogos={resultado.jogos} />
                        </div>
                    </div>
                )}

                {/* Mensagem quando não há resultado */}
                {!resultado && !loading && (
                    <div className='text-center py-10 text-muted-foreground'>
                        Selecione um algoritmo e um critério, depois clique em
                        "Ordenar" para ver os resultados.
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
