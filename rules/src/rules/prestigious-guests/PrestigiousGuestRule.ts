import { MaterialGame, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card } from '../../material/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PrestigiousGuest1Rule } from './PrestigiousGuest1Rule'
import { PrestigiousGuest2Rule } from './PrestigiousGuest2Rule'
import { PrestigiousGuest3Rule } from './PrestigiousGuest3Rule'
import { PrestigiousGuest4Rule } from './PrestigiousGuest4Rule'
import { PrestigiousGuest5Rule } from './PrestigiousGuest5Rule'
import { PrestigiousGuest6Rule } from './PrestigiousGuest6Rule'
import { PrestigiousGuest7Rule } from './PrestigiousGuest7Rule'
import { PrestigiousGuest8Rule } from './PrestigiousGuest8Rule'


export class PrestigiousGuestRule extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly column: number) {
    super(game)
  }

  get secureGuestMoves(): MaterialMove<number, number, number>[] {
    const guest = this.guest
    if (!guest.length) return []
    const id = guest.getItem()!.id.front
    return new this.guestRules[id](this.game, this.column).secureGuest()
  }

  get guest() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PrestigiousGuests)
      .locationId(this.column)
      .player(this.player)
  }


  get guestRules() {
    return {
      [Card.PrestigiousGuest1]: PrestigiousGuest1Rule,
      [Card.PrestigiousGuest2]: PrestigiousGuest2Rule,
      [Card.PrestigiousGuest3]: PrestigiousGuest3Rule,
      [Card.PrestigiousGuest4]: PrestigiousGuest4Rule,
      [Card.PrestigiousGuest5]: PrestigiousGuest5Rule,
      [Card.PrestigiousGuest6]: PrestigiousGuest6Rule,
      [Card.PrestigiousGuest7]: PrestigiousGuest7Rule,
      [Card.PrestigiousGuest8]: PrestigiousGuest8Rule,
    }
  }
}
