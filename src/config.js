export const locale = 'english'

export const myEmail = {
  name: 'Dan Luria',
  email: 'dan@sqwordle.com',
  subject: 'Sqwordle-related Words',
}

export const colorScheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
