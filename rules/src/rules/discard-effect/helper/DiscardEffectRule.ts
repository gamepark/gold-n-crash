import { MaterialGame, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, isBlue, isBrown, isGold, isGreen, isPurple, isRed, PrestigiousGuest } from '../../../material/Card'
import { LocationType } from '../../../material/LocationType'
import { MaterialType } from '../../../material/MaterialType'

export class DiscardEffectRule extends PlayerTurnRule {

  constructor(game: MaterialGame, readonly column: number) {
    super(game)
  }

  canDiscard(c: Card) {
    if (isGold(c)) return false
    if (isRed(c)) return this.isRedActivable
    if (isBlue(c)) return this.canDiscardBlue
    if (isPurple(c)) return this.canDiscardPurple
    if (isGreen(c)) return this.canDiscardGreen
    if (isBrown(c)) return this.canDiscardBrown

    return false
  }

  get isRedActivable() {
    const opponentTreasure = this
      .material(MaterialType.Card)
      .location(LocationType.Treasure)
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)

    return opponentTreasure.length && opponentTreasure.getItem()!.id.back !== PrestigiousGuest.PrestigiousGuest
  }

  get canDiscardBlue() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .player(this.player)
      .length > 1
  }

  get canDiscardPurple() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .player(this.player)
      .length > 1
  }

  get canDiscardGreen() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
      .length >= 2
  }

  get canDiscardBrown() {
    const opponentTreasure = this
      .material(MaterialType.Card)
      .location(LocationType.Discard)
      .player((player) => player !== this.player)
      .maxBy((item) => item.location.x!)

    return opponentTreasure.getItem()
  }
}
