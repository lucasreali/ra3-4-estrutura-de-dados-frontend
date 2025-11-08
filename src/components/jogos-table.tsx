import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { Jogo } from '@/lib/api';
import { deletarJogo } from '@/lib/api';
import { GamepadIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface JogosTableProps {
    jogos: Jogo[];
    onJogoDeletado?: () => void;
}

export const JogosTable = ({ jogos, onJogoDeletado }: JogosTableProps) => {
    const [deletando, setDeletando] = useState<string | null>(null);

    const formatarData = (data: string) => {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const handleDeletar = async (nomeJogo: string) => {
        if (!confirm(`Tem certeza que deseja deletar "${nomeJogo}"?`)) {
            return;
        }

        try {
            setDeletando(nomeJogo);
            await deletarJogo(nomeJogo);

            toast.success('Jogo deletado com sucesso!', {
                description: `${nomeJogo} foi removido da biblioteca.`,
            });

            if (onJogoDeletado) {
                onJogoDeletado();
            }
        } catch (error) {
            const mensagemErro =
                error instanceof Error ? error.message : 'Erro ao deletar jogo';
            toast.error('Erro ao deletar jogo', {
                description: mensagemErro,
            });
        } finally {
            setDeletando(null);
        }
    };

    if (jogos.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant='icon'>
                        <GamepadIcon />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum jogo encontrado</EmptyTitle>
                    <EmptyDescription>
                        Não há jogos cadastrados na biblioteca ainda.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    {/* Aqui pode adicionar um botão para criar jogo futuramente */}
                </EmptyContent>
            </Empty>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Gênero</TableHead>
                    <TableHead>Lançamento</TableHead>
                    <TableHead className='w-[100px]'>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jogos.map((jogo, index) => (
                    <TableRow key={index}>
                        <TableCell className='font-medium'>
                            {jogo.titulo}
                        </TableCell>
                        <TableCell>{jogo.genero}</TableCell>
                        <TableCell>{formatarData(jogo.lancamento)}</TableCell>
                        <TableCell>
                            <Button
                                variant='destructive'
                                size='icon-sm'
                                onClick={() => handleDeletar(jogo.titulo)}
                                disabled={deletando === jogo.titulo}
                                title='Deletar jogo'
                            >
                                <Trash2Icon className='size-4' />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
