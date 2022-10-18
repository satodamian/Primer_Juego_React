import { useEffect, useState } from "react";
import { HangImage } from "./components/HangImage";
import { getRandomWord } from "./helpers/getRandomWord";
import { letters } from "./helpers/letters";
import "./index.css";

function App() {

  // ! Palabra a adivinar
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  // ! Manejemos el Estado (Cantidad de Intentos)
    const [attemps, setAttemps] = useState(0);

    //* ESTADO DE PERDIO
    const [lose, setLose] = useState(false);
    //* ESTADO DE GANO 
    const [won, setWon] = useState(false);
    
    useEffect(() => {
      if(attemps >=9){
        setLose(true);
      }
    }, [attemps])
  
    //* DETERMINAR SI GANO 
    useEffect(() => {
      // console.log(hiddenWord);
      //* Conversion
      const currentHiddenWord = hiddenWord.split(' ').join('');
      if(currentHiddenWord === word){
        setWon(true);
      }

    }, [hiddenWord])
    

    const checkLetter = (letter) =>{
        // !LOGICA PARA ADIVINAR LA PALABRA
        if(lose) return;
        if(won) return;

        if(!word.includes(letter)){
           setAttemps( Math.min(attemps+1, 9));
           return; //Finaliza el proceso
        } 

        const hiddenWordArray = hiddenWord.split(" ");
        // console.log(hiddenWordArray);

        for (let i = 0; i < word.length; i++) {
            if(word[i] === letter){
                hiddenWordArray[i] = letter;
            }
        }

        setHiddenWord(hiddenWordArray.join(' '));
    }

    const newGame = () =>{
      const newWord = getRandomWord();

      setWord(newWord);
      setHiddenWord(('_ '.repeat(newWord.length)));
      setAttemps(0);
      setWon(false);
      setLose(false);

    }

  return (
    <div className="App">
      {/* Imagenes */}
      <HangImage imageNumber={attemps}/> 

      {/* Palabra Oculta */}
      <h3>{hiddenWord}</h3>

      {/* Numero de Intentos */}
      <h3>Intentos: {attemps}</h3>
      {
        //TODO: Mensaje si perdio
        (lose) 
          ? <h2>Perdiste, la palabra era {word}</h2>
          : ''
      }
      {
        //TODO: Mensaje si gano
        (won) 
          ? <h2>Ganaste, adivinaste la palabra: {word}</h2>
          : ''
      }

      {/* Botones de letras */}
      {
        //!Expresion de JS
        letters.map((letter) => (
          <button 
              key={letter}
              onClick={()=>checkLetter(letter)}>
              {letter}
              </button>
        ))
      }
      <br/>
      <button
        onClick={()=>newGame()}>Nuevo Juego</button>

    </div>
  );
}

export default App;
