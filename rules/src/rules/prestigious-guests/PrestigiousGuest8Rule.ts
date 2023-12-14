import { isBlue } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest8Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this
      .columnCards
      .filter((item) => isBlue(item.id.front)).length >= 3
  }
}
