import { FormEvent, useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import {CheckIcon} from '@radix-ui/react-icons';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

interface Game{
  id: string;
  title: string;
}

export function CreateAdModal(){
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [discord, setDiscord] = useState(false);

  console.log(weekDays)
  useEffect(()=>{
   axios('http://localhost:4000/games').then(res => setGames(res.data))
  }, [])

  async function handleCreateAd(event: FormEvent){
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if(!data.name){
      return;
    }

    try{
      await axios.post(`http://localhost:4000/games/${data.game}/ads`, {
      name : data.name,
      yaearPlayer: Number(data.yaearPlayer),
      discord: data.discord,
      weekDays: weekDays.map(Number),
      hourStart: data.hourEnd,
      hourEnd: data.hourEnd,
      useVoiceChannel: discord
    })
    alert("Anúncio criado com sucesso")
    }catch(error){
      console.log(error);
      alert("ERRO AO CRIAR ADS")
    }

  }

    return(
        <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
        
        
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='game' className='font-semibold' defaultValue="">Qual o game?</label>
              <select name="game" id="game" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                <option disabled value="">Selecione o jogo que deseja Jogar</option>
              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}
              </select>
              
            </div>

            <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Seu Nome (ou Nickname)</label>
            <Input type='text' name="name" id="name" placeholder="Insira seu Nickname" />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='yaearPlayer'>Joga a quantos anos?</label>
                <Input name="yaearPlayer" id="yaearPlayer" type="number" placeholder="Tudo bem ser Zero" />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='discord'>Qual seu discord?</label>
                <Input name="discord" id="discord" type="text" placeholder='Insira seu Discord' />
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='weekDays'>Quanto tempo deseja jogar</label>
              <ToggleGroup.Root type="multiple" className='grid grid-cols-4 gap-2' value={weekDays} onValueChange={setWeekDays}>
                <ToggleGroup.Item value="0"  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                <ToggleGroup.Item value="1"  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                <ToggleGroup.Item value="2"  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                <ToggleGroup.Item value="3" className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                <ToggleGroup.Item value="4" className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>Q</ToggleGroup.Item>
                <ToggleGroup.Item value="5" className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                <ToggleGroup.Item value="6" className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor='hourStart'>Qual horário do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input name="hourStart" id="hourStart" type="time" placeholder='De' />
                <Input name="hourEnd" id="hourEnd" type="time" placeholder='Até' />
              </div>
            </div>
            </div>

            <div className='mt-2 flex items-center gap-2 text-sm'>
             <Checkbox.Root checked={discord} onCheckedChange={(checked)=>{if(checked == true){setDiscord(true);}else{setDiscord(false)}}} className='w-6 h-6 p-1 rounded bg-zinc-900'>
                <Checkbox.Indicator>
                    <CheckIcon  className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
             </Checkbox.Root>
             Costumo me conectar ao chat de voz
            </div>
            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
              <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'><GameController className='w-6 h-6' /> Encontrar seu Duo</button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
    )
}