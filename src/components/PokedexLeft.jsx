import { useEffect, useRef } from 'react'
import Guess from './Guess'

export default function PokedexLeft({ guesses, answerName }) {
  const guessEndRef = useRef(null)
  const scrollToBottom = () => {
    guessEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [guesses])

  // Show 3 empty guesses to start
  const guessesWithFiller = Object.values({
    ...[{ text: '' }, { text: '' }, { text: '' }],
    ...guesses,
  })

  return (
    <div id="guess-container">
      {guessesWithFiller.map((guess, index) => (
        <Guess
          key={`${index}-${guess.text}`}
          answer={answerName}
          guess={guess}
          level={index + 1}
        />
      ))}
      <div ref={guessEndRef} />
    </div>
  )
}
