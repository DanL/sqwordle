import { formatISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { locale } from '../config'
import pokedex from '../../pokemon.json/pokedex.json'
// import dailyChallenge from '../dailyChallenge.json'
import contactMe from '../lib/contactMe'
import Share from './Share'
import PokedexLeft from './PokedexLeft'
import PokedexRight from './PokedexRight'

import './Sqwordle.scss'

// Thanks MDN for the cool function
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

export default function Sqwordle() {
  const [guesses, setGuesses] = useState([])
  const [answer, setAnswer] = useState()

  useEffect(() => {
    const selectedPokemon = pokedex[getRandomInt(0, pokedex.length)]
    setAnswer(selectedPokemon)
  }, [])

  // We've already gone through every Pokemon, so we'll just pick a random one every time the page loads
  //
  // const today = formatISO(new Date(), { representation: 'date' })
  // const todaysChallenge = dailyChallenge[today]
  // const todaysNumber =
  //   Object.entries(dailyChallenge).findIndex(([day]) => day === today) + 1
  // const answer = pokedex.find((pokemon) => pokemon.id === todaysChallenge)

  // Need to let `setAnswer` get called and rerender
  if (answer === undefined) return <div></div>

  const answerName = answer.name[locale].toUpperCase()

  const possibleAnswers = pokedex
    .map(({ name }) => name[locale].toUpperCase())
    .filter((name) => name.length === answerName.length)
    .filter((name) => name.search(/[^a-zA-Z]/) === -1)

  const aWinnerIsYou =
    guesses.length > 0 && guesses[guesses.length - 1].text === answerName

  return (
    <div>
      <div id="logo">
        <img src="./static/sqwordle.png" alt="Sqwordle" />
        <div id="logo-text">is for PokéMasters ONLY!!</div>
      </div>
      <div id="pokedex">
        <div id="pokedex-left">
          <div id="pokedex-left-inner">
            <PokedexLeft guesses={guesses} answerName={answerName} />
          </div>
        </div>
        <div id="pokedex-right">
          <div id="pokedex-right-inner">
            {!aWinnerIsYou && (
              <PokedexRight
                guesses={guesses}
                setGuesses={setGuesses}
                answer={answer}
                answerName={answerName}
                possibleAnswers={possibleAnswers}
              />
            )}
            {aWinnerIsYou && (
              <Share
                // todaysNumber={todaysNumber}
                answerName={answerName}
                guesses={guesses}
                possibleAnswers={possibleAnswers}
              />
            )}
          </div>
        </div>
      </div>
      <div id="message">
        <div id="message-inner">
          {/* The range is 5-10 characters */}
          Welcome back, trainer!
          {/* It's day #{todaysNumber}. */}
          <br />
          There are {possibleAnswers.length - guesses.length} possible{' '}
          {answerName.length}
          -letter Pokémon to guess from.
        </div>
      </div>
      <div id="copyright">
        All Pokémon are copyrighted by the Pokémon Company and its affiliates.
        <br />
        This site is a tip of Ash's hat to the fun game{' '}
        <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.
        <br />
        Created by accident by <a href="https://www.danluria.com/">Dan Luria</a>
        .{' '}
        <a href="#" onClick={contactMe}>
          Say hi
        </a>
        .
        <br />
        Source code on <a href="https://github.com/DanL/sqwordle">GitHub</a>.
      </div>
    </div>
  )
}
