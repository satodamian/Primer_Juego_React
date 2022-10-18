let words = [
    'COMPUTADORA',
    'PALTA',
    'ACCIDENTE',
    'PROGRAMACION',
    'AMOR',
    'ANIMAL',
    'VEHICULO',
    'NOMBRES',
    'CELULAR',
    'TECLADO'
]


const getRandomWord = () => {
   const randomIndex = ( Math.floor(Math.random() * words.length));
   return words[randomIndex];
}

export {
    getRandomWord,
} 
