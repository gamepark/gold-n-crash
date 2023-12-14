import { isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '../../material/Card'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'

export class PrestigiousGuest5Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    return (this.hasBlue + this.hasGreen + this.hasPurple + this.hasBrown + this.hasRed + this.hasGold) >= 4
  }

  get hasBlue(): number {
    return this.columnCards.filter((item) => isBlue(item.id.front)).length? 1: 0
  }

  get hasGreen(): number {
    return this.columnCards.filter((item) => isGreen(item.id.front)).length? 1: 0
  }

  get hasPurple(): number {
    return this.columnCards.filter((item) => isPurple(item.id.front)).length? 1: 0
  }

  get hasBrown(): number {
    return this.columnCards.filter((item) => isBrown(item.id.front)).length? 1: 0
  }

  get hasRed(): number {
    return this.columnCards.filter((item) => isRed(item.id.front)).length? 1: 0
  }

  get hasGold(): number {
    return this.columnCards.filter((item) => isGold(item.id.front)).length? 1: 0
  }
}
