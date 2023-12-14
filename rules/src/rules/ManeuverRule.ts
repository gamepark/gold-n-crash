import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { PrestigiousGuestRule } from './prestigious-guests/PrestigiousGuestRule'

export class ManeuverRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const columns = [1, 2, 3]
    for (const column of columns) {
      const cards = this
        .material(MaterialType.Card)
        .location(LocationType.Column)
        .locationId(column)
        .player(this.player)
        .maxBy((item) => item.location.x!)

      if (cards.length) {
        moves.push(
          ...columns
            .filter((c) => c !== column)
            .map((c) => cards.moveItem({
              type: LocationType.Column,
              player: this.player,
              id: c
            }))
        )
      }
    }

    return moves

  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.Column, move.location.id)
    return new PrestigiousGuestRule(this.game).secureGuestMoves
  }

  incrementPlayedCard() {
    this.memorize(Memory.PlayedCards, (played: number | undefined) => (played ?? 0) + 1)
  }
}
