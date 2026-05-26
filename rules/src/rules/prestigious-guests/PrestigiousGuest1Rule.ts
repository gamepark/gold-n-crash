import { CardId } from '../../material/Card'
import { CardGold } from '../../material/CrewCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { AbstractPrestigiousGuestRule } from './AbstractPrestigiousGuestRule'
import { sumBy } from 'es-toolkit'

export class PrestigiousGuest1Rule extends AbstractPrestigiousGuestRule {
  isInvited(): boolean {
    const cards = this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.column)
      .player(this.player)
      .getItems<CardId>()

    if (!cards.length) return false
    return sumBy(cards, (c) => CardGold[c.id.front]) >= 9
  }
}
