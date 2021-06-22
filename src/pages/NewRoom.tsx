import illustration from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/button'

export function NewRoom(){
    return(
        <div id='page-auth'>
            <aside>
                <img src={illustration} alt='ilustração de perguntas e respostas'/>
                <strong>Crie suas salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logo} alt='Letmeask'/>
                   <h2>Crie uma nova sala</h2>
                    <form>
                        <input type='text' placeholder='nome da sala'/>
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <a href="#">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}