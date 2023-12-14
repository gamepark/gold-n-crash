import { isPurple } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest6Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this
      .columnCards
      .filter((item) => isPurple(item.id.front)).length >= 3
  }
}
