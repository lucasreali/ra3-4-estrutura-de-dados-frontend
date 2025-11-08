import { JogosList } from '@/components/jogos-list';
import { OrdenarJogos } from '@/components/ordenar-jogos';

export const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen p-4 bg-muted gap-6'>
            <JogosList />
            <OrdenarJogos />
        </div>
    );
};
