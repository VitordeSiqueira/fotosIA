import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Robot} from '../src/images/robot.svg'
import Carregando from './images/Spinner-1s-200px.gif'


function App() {
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState (facilitador para getter/setter)
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [etnia, setEtnia] = useState('')
  const [idade, setIdade] = useState('')

  function ListaPessoas(props){
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="Pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }


   async function obtemFoto () {
     setCarregando(true)
      let chaveAPI = process.env.REACT_APP_APIKEY
      
      const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''
      const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''

      let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}$order_by=random`
      
      await fetch(url)
        .then(response => response.json())
        .then(data => {
          setPessoas(data.faces)
        })
        .catch(function (error){
          console.error('Houve um erro na requisição' + error.message)
        })
      setCarregando(false)
    }

  //[] array

  return(
    <div className="app">
      <h1>Gerador de Fotos com IA</h1>
      <Robot />
      {carregando &&
        <img src={Carregando} title="Aguarde..." alt="aguarde" width="100"></img>
      }
      <div className="linha">
        <ListaPessoas pessoas={pessoas} />
      </div>

      <div className='linha'>
          <label>Idade:</label>
          <select onChange={event => setIdade(event.target.value)}>
            <option value="">Todas</option>
            <option value="infant">Infantil</option>
            <option value="child">Criança</option>
            <option value="young-adult">Jovem</option>
            <option value="adult">Adulto</option>
            <option value="elderly">Idoso</option>
          </select>

          <label>Etnia: </label>
          <select onChange={e => setEtnia(e.target.value)}>
            <option value="">Todas</option>
            <option value="white">Branca</option>
            <option value="latino">Latina</option>
            <option value="asian">Asiática</option>
            <option value="black">Negra</option>
          </select>
      </div>

      <div className="linha">
        <button type='button' onClick={obtemFoto}>
          obter Imagens
        </button>

        {pessoas.length > 0 &&
        <button type='button' onClick={() => setPessoas([])}>
          Limpar Imagens
        </button>
        }
        
      </div>
    </div>
  )
}


export default App;