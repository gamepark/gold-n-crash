import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'

export abstract class AbstractPrestigiousGuestRule extends PlayerTurnRule {

  constructor(game: MaterialGame) {
    super(game)
  }

  secureGuest() {
    if ((this.guest.getItem()!.location?.id !== this.column) || !this.isInvited()) return []
    return this.guest.moveItems({
      type: LocationType.Treasure,
      player: this.player
    })
  }

  get guest() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.PrestigiousGuests)
      .locationId(this.remind(Memory.Column))
      .player(this.player)
  }

  get column() {
    return this.remind(Memory.Column)
  }

  get columnCards() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.column)
      .player(this.player)
  }

  abstract isInvited(): boolean
}
