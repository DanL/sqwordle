import getMailtoLink from './getMailtoLink'
import { myEmail } from '../config'

export default function contactMe() {
  window.location.href = getMailtoLink(
    myEmail.name,
    myEmail.email,
    myEmail.subject
  )
}
