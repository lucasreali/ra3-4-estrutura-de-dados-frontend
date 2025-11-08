import { CriarJogoDialog } from '@/components/criar-jogo-dialog';
import { JogosTable } from '@/components/jogos-table';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Jogo } from '@/lib/api';
import { listarJogos } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const JogosList = () => {
    const [jogos, setJogos] = useState<Jogo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const carregarJogos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await listarJogos();
            setJogos(data);
        } catch (err) {
            const mensagemErro =
                err instanceof Error ? err.message : 'Erro ao carregar jogos';
            setError(mensagemErro);
            toast.error('Erro ao carregar jogos', {
                description: mensagemErro,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarJogos();
    }, []);

    return (
        <Card className='w-full max-w-4xl'>
            <CardHeader>
                <CardTitle>Biblioteca de Jogos</CardTitle>
                <CardDescription>
                    Lista de todos os jogos cadastrados no sistema
                </CardDescription>
                <CardAction>
                    <CriarJogoDialog onJogoCriado={carregarJogos} />
                </CardAction>
            </CardHeader>
            <CardContent>
                {loading && (
                    <div className='text-center py-10 text-muted-foreground'>
                        Carregando jogos...
                    </div>
                )}

                {!loading && (
                    <JogosTable jogos={jogos} onJogoDeletado={carregarJogos} />
                )}
            </CardContent>
        </Card>
    );
};
