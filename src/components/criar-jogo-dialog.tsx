import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { CriarJogoRequest } from '@/lib/api';
import { criarJogo } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const jogoSchema = z.object({
    titulo: z
        .string()
        .min(1, 'O título é obrigatório')
        .min(3, 'O título deve ter pelo menos 3 caracteres')
        .max(100, 'O título deve ter no máximo 100 caracteres'),
    genero: z
        .string()
        .min(1, 'O gênero é obrigatório')
        .min(3, 'O gênero deve ter pelo menos 3 caracteres')
        .max(50, 'O gênero deve ter no máximo 50 caracteres'),
    lancamento: z
        .string()
        .min(1, 'A data de lançamento é obrigatória')
        .refine((data) => {
            const dataLancamento = new Date(data);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            return dataLancamento < hoje;
        }, 'A data de lançamento deve ser no passado'),
});

type JogoFormValues = z.infer<typeof jogoSchema>;

interface CriarJogoDialogProps {
    onJogoCriado?: () => void;
}

export const CriarJogoDialog = ({ onJogoCriado }: CriarJogoDialogProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<JogoFormValues>({
        resolver: zodResolver(jogoSchema),
        defaultValues: {
            titulo: '',
            genero: '',
            lancamento: '',
        },
    });

    const onSubmit = async (values: JogoFormValues) => {
        try {
            setLoading(true);
            const jogoData: CriarJogoRequest = {
                titulo: values.titulo,
                genero: values.genero,
                lancamento: values.lancamento,
            };

            await criarJogo(jogoData);

            toast.success('Jogo criado com sucesso!', {
                description: `${values.titulo} foi adicionado à biblioteca.`,
            });

            form.reset();
            setOpen(false);

            // Chama a função callback para recarregar a lista
            if (onJogoCriado) {
                onJogoCriado();
            }
        } catch (error) {
            const mensagemErro =
                error instanceof Error ? error.message : 'Erro ao criar jogo';
            toast.error('Erro ao criar jogo', {
                description: mensagemErro,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!loading) {
            setOpen(newOpen);
            if (!newOpen) {
                form.reset();
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon />
                    Adicionar Jogo
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Jogo</DialogTitle>
                    <DialogDescription>
                        Preencha os dados do jogo para adicioná-lo à biblioteca.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='titulo'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ex: The Legend of Zelda'
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        O nome do jogo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='genero'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gênero</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Ex: Action-Adventure'
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        O gênero do jogo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lancamento'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Lançamento</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='date'
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A data de lançamento do jogo (deve ser
                                        no passado).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => handleOpenChange(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                            <Button type='submit' disabled={loading}>
                                {loading ? 'Criando...' : 'Criar Jogo'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
