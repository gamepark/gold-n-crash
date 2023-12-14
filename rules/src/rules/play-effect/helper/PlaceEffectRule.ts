import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '../../../material/Card'
import { getOpponentColumnIndex } from '../../../material/GetOpponentColumn'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'
import { ZeppelinState } from '../../../material/Zeppelin'

export class PlaceEffectRule extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly column: number) {
    super(game)
  }

  canPlace(c: Card) {
    if (isGold(c)) return true
    if (isRed(c)) return this.canActivateRed
    if (isBlue(c)) return this.canActivateBlue
    if (isPurple(c)) return this.canActivatePurple
    if (isGreen(c)) return this.canActivateGreen
    if (isBrown(c)) return this.canActivateBrown

    return false
  }

  get canActivateRed() {
    return this
      .material(MaterialType.ZeppelinCard)
      .location(LocationType.Zeppelins)
      .locationId(this.opponentColumn)
      .player((player) => player !== this.player)
      .getItem()?.location.rotation !== ZeppelinState.VISIBLE
  }

  get opponentColumn() {
    return getOpponentColumnIndex(this.column)
  }

  get canActivateBlue() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.opponentColumn)
      .player((player) => player !== this.player)
      .length > 0
  }

  get canActivateGreen() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
      .length > 0
  }

  get canActivatePurple() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player(this.player)
      .length > 0
  }

  get canActivateBrown() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId((id: number) => Math.abs(id - this.column) === 1)
      .player(this.player)
      .length > 0
  }
}
