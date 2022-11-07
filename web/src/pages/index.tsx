
interface HomeProps {
  poolCount: number;
  guessCount: Number;
  userCount: Number;
}


import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import IconCheckImg from '../assets/icon-check.svg'
import UsersAvatarExampleImg from '../assets/users-avatar-example.png'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios';

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function creatPool(event: FormEvent){
    event.preventDefault()  // evitar comportamento padrão de um formulario HTML - Redirecionar para outras páginas
  
    try{
        const response = await api.post('/pools' , {
          title: poolTitle
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a area de trânsferencia')

      setPoolTitle("")

    }catch (e) {
      console.log(e)
      alert('Falha ao criar o bolão tente novamente!')
    }
    
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt="NLW COPA"/>

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={UsersAvatarExampleImg} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={ creatPool } className='mt-10 flex gap-2'>
          <input
          className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type='text' 
            required 
            placeholder='Qual nome do seu bolão?' 

            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />

          <button
          className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex itens-center justify-between text-gray-100'>
          <div className='flex itens-center gap-6'>
            <Image src={IconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600'> </div>

          <div className='flex itens-center gap-6'>
            <Image src={IconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites criados</span>
            </div>
          </div>
        </div>
        
      </main>

      <Image 
        src={appPreviewImage} 
        alt="Dois celulares exibindo uma previa da aplicação móvel do nlw" 
        quality={100}
      />
    </div>
  )
}


export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}
