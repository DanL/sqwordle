export default function getMailtoLink(name, email, subject = '', body = '') {
  const address = encodeURIComponent(`${name} <${email}>`)
  subject = encodeURIComponent(subject)
  body = encodeURIComponent(body)

  return `mailto:${address}?subject=${subject}&body=${body}`
}
