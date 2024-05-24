import parseGuess from '../lib/parseGuess'
import { colorScheme } from '../config'

function getEmoji(isExact, isPartial) {
  if (isExact) return '🟩'
  if (isPartial) return '🟨'
  return colorScheme === 'dark' ? '⬛️' : '⬜️'
}

function guessToEmoji(answerName, text) {
  return parseGuess(answerName, text)
    .map(({ isExact, isPartial }) => getEmoji(isExact, isPartial))
    .join('')
}

export default function Share({
  // todaysNumber,
  answerName,
  guesses,
  possibleAnswers,
}) {
  return (
    <div id="share">
      Sqwordle {guesses.length}/{possibleAnswers.length}
      <br />- {answerName} -
      {guesses.map(({ text }) => (
        <div key={text}>{guessToEmoji(answerName, text)}</div>
      ))}
    </div>
  )
}
