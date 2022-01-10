export default function parseGuess(answerName, guessText) {
  const answerLetters = answerName.split('')
  return guessText.split('').map((letter, index) => {
    const isExact = answerLetters[index] === letter
    const isPartial = !isExact && answerLetters.includes(letter)
    const doesNotMatch = !isExact && !isPartial
    return {
      text: letter,
      isExact,
      isPartial,
      doesNotMatch,
    }
  })
}
