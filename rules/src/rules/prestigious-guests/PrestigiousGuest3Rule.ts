import { isGreen } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest3Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this
      .columnCards
      .filter((item) => isGreen(item.id.front)).length >= 3
  }
}
