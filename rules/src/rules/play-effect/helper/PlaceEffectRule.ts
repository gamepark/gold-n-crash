import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '../../../material/Card'
import { getOpponentColumnIndex } from '../../../material/GetOpponentColumn'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'

export class PlaceEffectRule extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly column: number) {
    super(game)
  }

  isActivableCard(c: Card) {
    if (isGold(c)) return true
    if (isRed(c)) return this.isRedActivable
    if (isBlue(c)) return this.isBlueActivable
    if (isPurple(c)) return this.isPurpleActivable
    if (isGreen(c)) return this.isGreenActivable
    if (isBrown(c)) return this.isBrownActivable

    return false
  }

  get isRedActivable() {
    return !!this
      .material(MaterialType.ZeppelinCard)
      .location(LocationType.Zeppelins)
      .locationId(getOpponentColumnIndex(this.column))
      .player((player) => player !== this.player)
      .getItem()?.location.rotation
  }

  get isBlueActivable() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(getOpponentColumnIndex(this.column))
      .player((player) => player !== this.player)
      .length > 0
  }

  get isGreenActivable() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
      .length > 0
  }

  get isPurpleActivable() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player(this.player)
      .length > 0
  }

  get isBrownActivable() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId((id: number) => Math.abs(id - this.column) === 1)
      .player(this.player)
      .length > 0
  }
}
