import { Memory } from '../Memory'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest2Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return this.playedCard >= 2
  }

  get playedCard() {
    const column = this.column
    const playedCard = this.remind<Record<number, number>>(Memory.PlayedCards) ?? {}
    return playedCard?.[column] ?? 0
  }
}
