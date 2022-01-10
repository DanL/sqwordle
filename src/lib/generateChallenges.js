import pokedex from '../../pokemon.json/pokedex.json'
import shuffle from '../lib/shuffle'
import { add, eachDayOfInterval, formatISO, startOfToday } from 'date-fns'

// const locales = ['english', 'french']
const locale = 'english'

// TODO: Update this for French
// Filters out names that contain non-letter characters like
// `Mr. Mime` and `Porygon2`
const allNames = pokedex
  .filter((pokemon) => pokemon.name[locale].search(/[^a-zA-Z]/) === -1)
  .map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name[locale],
  }))

const pokemonByLength = allNames.reduce((memo, pokemon) => {
  memo[pokemon.name.length] ||= []
  memo[pokemon.name.length].push(pokemon)
  return memo
}, {})

const validIds = Object.entries(pokemonByLength)
  .filter(([_, pokemonsters]) => pokemonsters.length > 10)
  .flatMap(([_, pokemonsters]) => pokemonsters.map((pokemon) => pokemon.id))

shuffle(validIds)

// `eachDayOfInterval` is inclusive so we need to skip the very last day
const today = startOfToday()
const lastDay = add(today, { days: validIds.length - 1 })
const allDays = eachDayOfInterval({ start: today, end: lastDay })

const dailyChallenge = Object.fromEntries(
  allDays.map((date, index) => [
    formatISO(date, { representation: 'date' }),
    validIds[index],
  ])
)

console.log({ dailyChallenge })
