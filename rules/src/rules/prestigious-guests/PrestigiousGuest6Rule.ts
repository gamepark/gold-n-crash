import { CardId, isPurple } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest6Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this
      .columnCards
      .filter<CardId>((item) => isPurple(item.id.front)).length >= 3
  }
}
