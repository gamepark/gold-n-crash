import { isGold } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest7Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this
      .columnCards
      .filter((item) => isGold(item.id.front)).length >= 2
  }
}
