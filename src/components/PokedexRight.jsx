import { useState } from 'react'
import { locale } from '../config'
import pokedex from '../../pokemon.json/pokedex.json'
import Keyboard from './Keyboard'

export default function PokedexRight({
  guesses,
  setGuesses,
  answer,
  answerName,
  possibleAnswers,
}) {
  const [error, setError] = useState('')
  const [currentGuess, rawSetCurrentGuess] = useState('')

  // `value` may be a `string` or a `function`
  const setCurrentGuess = (value) => {
    // Clear any previous errors whenever a new guess is made
    setError('')

    if (typeof value === 'string') {
      if (value.length > answerName.length) return
      if (value.search(/[^a-zA-Z]/) > -1) return
    }

    rawSetCurrentGuess(value)
  }

  const guess = (event) => {
    // Necessary when pressing `Enter`
    event.preventDefault()

    if (currentGuess.length < answerName.length)
      return setError(`Too short! Must be ${answerName.length} characters.`)
    if (!possibleAnswers.includes(currentGuess))
      return setError(`That's not a real Pokémon name!`)
    if (guesses.map(({ text }) => text).includes(currentGuess))
      return setError('You already guessed that Pokémon!')

    // Clear any previous errors
    setError('')

    const pokemon = pokedex.find(
      (pokemon) => pokemon.name[locale].toUpperCase() === currentGuess
    )

    setGuesses([...guesses, { text: currentGuess, pokemon }])
    setCurrentGuess('')
  }

  const appendToCurrentGuess = (letter) => {
    setCurrentGuess((prev) => {
      if (prev.length === answerName.length) return prev
      return `${prev}${letter}`
    })
  }

  const backspaceCurrentGuess = () => {
    setCurrentGuess((prev) => prev.slice(0, -1))
  }

  const guessForMe = () => {
    const pokemonsters = pokedex.filter((pokemon) => {
      const name = pokemon.name[locale].toUpperCase()
      return (
        name.length === answerName.length &&
        name.search(/[^a-zA-Z]/) === -1 &&
        ![
          ...guesses.map(({ text }) => text),
          currentGuess,
          answerName,
        ].includes(pokemon.name[locale].toUpperCase())
      )
    })

    if (pokemonsters.length === 0) {
      return setError('You ran out of Pokémon to guess!')
    }

    // Clear any previous errors
    setError('')

    const guess = pokemonsters[Math.floor(Math.random() * pokemonsters.length)]

    setGuesses((prevGuesses) => [
      ...prevGuesses,
      {
        text: guess.name[locale].toUpperCase(),
        pokemon: guess,
      },
    ])
  }

  const giveUp = () => {
    setGuesses((prevGuesses) => [
      ...prevGuesses,
      {
        text: answerName,
        pokemon: answer,
      },
    ])
  }

  return (
    <>
      <form id="the-form">
        <input
          id="current-guess"
          type="text"
          placeholder="POKÉMON"
          value={currentGuess}
          onChange={(event) =>
            setCurrentGuess(event.target.value.toUpperCase())
          }
        />
        {/* Necessary for being able to use the Enter key */}
        <input
          type="submit"
          value="Enter"
          onClick={guess}
          style={{ display: 'none' }}
        />
      </form>
      <Keyboard
        guesses={guesses}
        answerName={answerName}
        appendToCurrentGuess={appendToCurrentGuess}
        backspaceCurrentGuess={backspaceCurrentGuess}
        onEnter={guess}
        onGuessForMe={guessForMe}
        onGiveUp={giveUp}
      />
      <div id="error">{error}</div>
    </>
  )
}
