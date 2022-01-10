import parseGuess from '../lib/parseGuess'
import classList from '../lib/classList'
import { locale } from '../config'

import './Guess.scss'

export default function Guess({ answer, guess, level }) {
  // Render a placeholder instead
  if (guess.text === '') {
    return <div className="fake-guess" />
  }

  const formattedGuess = parseGuess(answer, guess.text)

  const id = `${guess.pokemon.id}`.padStart(3, 0)
  const fileNames = {
    image: `./pokemon.json/images/${id}.png`,
    sprite: `./pokemon.json/sprites/${id}MS.png`,
    thumbnail: `./pokemon.json/thumbnails/${id}.png`,
  }

  return (
    <div className="guess">
      <a
        className="avatar"
        href={`https://bulbapedia.bulbagarden.net/wiki/${guess.pokemon.name[locale]}_(Pok%C3%A9mon)`}
      >
        <img src={fileNames.image} alt="" />
      </a>
      <div className="info">
        <div>
          {formattedGuess.map((letter, index) => (
            <span
              key={`${guess}-${index}`}
              className={classList(
                'letter-box',
                'letter',
                letter.isExact && 'letter-is-exact',
                letter.isPartial && !letter.isExact && 'letter-is-partial',
                letter.doesNotMatch && 'letter-does-not-match'
              )}
            >
              {letter.text}
            </span>
          ))}
        </div>
        <div className="hp-bar">
          <span className="hp-bar-label">
            <span className="hp-bar-label-gradient">HP</span>
          </span>
          <span className="hp-bar-fill"></span>
        </div>
        <div className="stats">
          <div className="stats-level">Lv{level}</div>
          <div className="stats-hp">
            {guess.pokemon.base.HP}/{guess.pokemon.base.HP}
          </div>
        </div>
      </div>
    </div>
  )
}
