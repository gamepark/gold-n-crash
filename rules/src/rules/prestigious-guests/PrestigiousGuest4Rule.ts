import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest4Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this.columnCards.length >= 5
  }
}
