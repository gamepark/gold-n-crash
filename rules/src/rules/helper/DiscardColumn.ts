import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '../../material/Card'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'

export class DiscardColumn extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly column: number) {
    super(game)
  }

  get discardMoves() {
    const columnCard = this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.column)
      .player(this.player)

    const red = columnCard.filter((item) => isRed(item.id.front)).length >= 3
    const blue = columnCard.filter((item) => isBlue(item.id.front)).length >= 3
    const purple = columnCard.filter((item) => isPurple(item.id.front)).length >= 3
    const green = columnCard.filter((item) => isGreen(item.id.front)).length >= 3
    const brown = columnCard.filter((item) => isBrown(item.id.front)).length >= 3
    const gold = columnCard.filter((item) => isGold(item.id.front)).length >= 3
    if (red || blue || purple || green || brown || gold) return this.discardColumnMoves
    return []
  }

  get discardColumnMoves() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.column)
      .player(this.player)
      .sort((item) => item.location.x!)
      .moveItems({
        type: LocationType.Discard,
        player: this.player
      })
  }
}
