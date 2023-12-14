import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { isGold } from '../../material/Card'
import { getPlayEffect } from '../../material/CrewCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { PlaceEffectRule } from '../play-effect/helper/PlaceEffectRule'
import { RuleId } from '../RuleId'

export class PlaceCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const hand = this.hand
    const validColumns = this.validColumns
    for (const id of validColumns) {
      const playCardRule = new PlaceEffectRule(this.game, id)
      moves.push(
        ...hand
          .filter((item) => playCardRule.canPlace(item.id.front))
          .moveItems({
            type: LocationType.Column,
            id,
            player: this.player
          })
      )
    }

    return moves
  }

  get validColumns(): number[] {
    let columns: number[] = []
    let minCard: undefined | number = undefined
    for (let id = 1; id <= 3; id++) {
      const count = this
        .material(MaterialType.Card)
        .location(LocationType.Column)
        .player(this.player)
        .locationId(id)
        .length

      if (minCard === count) {
        columns.push(id)
      } else if (minCard === undefined || minCard > count) {
        minCard = count
        columns = [id]
      }
    }

    return columns
  }

  get hand() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .player(this.player)
  }

  get deck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(this.player)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.Column, move.location.id)
    this.incrementAction()
    this.incrementPlayedCard()
    const card = this.material(MaterialType.Card).getItem(move.itemIndex)!.id.front
    const moves = []
    if (!this.hand.length && !this.deck.length) {
      this.memorize(Memory.LastPlayer, this.game.players.find((p) => p !== this.player))
    }

    if (card) {
      const playEffect = getPlayEffect(card)
      if (playEffect) {
        moves.push(this.rules().startRule(playEffect))
      } else if (isGold(card)) {
        moves.push(this.rules().startRule(RuleId.EndOfCardResolution))
      }
    } else {
      console.error("Moving a card without front ?")
    }

    return moves
  }

  incrementAction() {
    this.memorize(Memory.Actions, (action: number | undefined) => (action ?? 0) + 1)
  }

  incrementPlayedCard() {
    const column = this.remind(Memory.Column)
    this.memorize(Memory.PlayedCards, (played: Record<number, number> | undefined) => {
      if (!played) played = {}
      if (played[column] === undefined) played[column] = 0
      played[column]++
      return played
    })
  }
}
