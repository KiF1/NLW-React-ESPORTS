import './styles/main.css';
import { GammerBanner } from './components/GammerBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export default function App() {
const [games, setGames] = useState<Game[]>([]);

useEffect(()=>{
  axios('http://localhost:4000/games').then(res => setGames(res.data))
}, [])

  return(
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src="src/assets/logo-nlw-esports.png" alt="" />
      <h1 className='text-6xl text-white mt-20 font-black' >Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui</h1>
    
    <div className='grid grid-cols-6 gap-6 mt-16'>
      {games.map(game => {
        return(
<GammerBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        )
      })}
    </div>
    
    <Dialog.Root>
    <CreateAdBanner />
    <CreateAdModal />
    </Dialog.Root>
</div>
  )
}