import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { Card, isGold } from '../../material/Card'
import { getCardColorFinder, getPlayEffect } from '../../material/CrewCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { PlaceEffectRule } from '../play-effect/helper/PlaceEffectRule'
import { RuleId } from '../RuleId'
import max from 'lodash/max'

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
    const allColumns = [1, 2, 3]
    const maxCard = max(allColumns.map((column) => this.countCard(column))) ?? 0
    const columns = []
    for (let id = 1; id <= 3; id++) {
      const count = this.countCard(id)
      if (count < maxCard) {
        columns.push(id)
      }
    }

    if (!columns.length) return allColumns

    return columns
  }

  countCard(column: number) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .player(this.player)
      .locationId(column)
      .length
  }

  get hand() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .player(this.player)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.Column, move.location.id)
    this.incrementAction()
    this.incrementPlayedCard()
    const card = this.material(MaterialType.Card).getItem(move.itemIndex).id.front
    const moves = []
    if (card) {
      const playEffect = getPlayEffect(card)
      if (playEffect) {
        this.memorize(Memory.NumberOfEffect, this.countCardOfType(card))
        moves.push(this.startRule(playEffect))
      } else if (isGold(card)) {
        moves.push(this.startRule(RuleId.EndOfCardResolution))
      }
    } else {
      console.error('Moving a card without front ?')
    }

    return moves
  }

  countCardOfType(c: Card) {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Column)
      .locationId(this.remind(Memory.Column))
      .player(this.player)
      .filter((item) => getCardColorFinder(c)(item.id.front))
      .length

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
