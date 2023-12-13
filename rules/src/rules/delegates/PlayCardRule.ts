import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { Memory } from '../Memory'
import { getPlayEffect } from '../../material/CrewCard'

export class PlayCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const hand = this.hand
    const validColumns = this.validColumns
    for (const id of validColumns) {
      moves.push(
        ...hand
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

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    const card = this.material(MaterialType.Card).getItem(move.itemIndex)!.id.front

    if (card) {
      const playEffect = getPlayEffect(card)
      if (playEffect) return [this.rules().startPlayerTurn(playEffect, this.player)]
    } else {
      console.error("Moving a card without front ?")
    }

    return []
  }
}
