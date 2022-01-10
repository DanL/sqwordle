import classList from '../lib/classList'
import parseGuess from '../lib/parseGuess'

import './Keyboard.scss'

const keys = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '←'],
]

export default function Keyboard({
  guesses,
  answerName,
  appendToCurrentGuess,
  backspaceCurrentGuess,
  onEnter,
  onGuessForMe,
  onGiveUp,
}) {
  const condensedGuesses = guesses.reduce((memo, guess) => {
    const parsedGuess = parseGuess(answerName, guess.text)

    parsedGuess.forEach((letter) => {
      // Set a guess for the given letter if it doesn't already exist
      memo[letter.text] ||= letter

      // If the guess has previously been a partial match, an exact match should supercede it
      if (memo[letter.text].isPartial && letter.isExact)
        memo[letter.text] = letter
    })

    return memo
  }, {})

  const keysAsGuesses = keys.map((row) =>
    row.map((key) => {
      return (
        condensedGuesses[key] || {
          text: key,
          isExact: false,
          isPartial: false,
          doesNotMatch: false,
        }
      )
    })
  )

  return (
    <div id="keyboard">
      <div id="keyboard-main">
        {keysAsGuesses.map((row, index) => (
          <div key={index} className="keyboard-row">
            {row.map((key) => {
              if (key.text === '←') {
                return (
                  <span key="←" className="key" onClick={backspaceCurrentGuess}>
                    ←
                  </span>
                )
              }

              return (
                <span
                  key={key.text}
                  className={classList(
                    'key',
                    key.isExact && 'key-is-exact',
                    key.isPartial && !key.isExact && 'key-is-partial',
                    key.doesNotMatch && 'key-does-not-match'
                  )}
                  onClick={() => appendToCurrentGuess(key.text)}
                >
                  {key.text}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      <div id="keyboard-controls">
        <span className="key" onClick={onEnter}>
          Enter
        </span>
        <span className="key" onClick={onGuessForMe}>
          Guess For Me
        </span>
        <span className="key" onClick={onGiveUp}>
          Give Up
        </span>
      </div>
    </div>
  )
}
