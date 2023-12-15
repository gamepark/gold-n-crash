import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { DiscardColumn } from '../helper/DiscardColumn'
import { PrestigiousGuestRule } from '../prestigious-guests/PrestigiousGuestRule'
import { RuleId } from '../RuleId'

export class ManoeuvreRule extends PlayerTurnRule {

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
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Column) return []
    const moves: MaterialMove[] = []
    moves.push(...new PrestigiousGuestRule(this.game, move.location.id).secureGuestMoves)
    moves.push(...new DiscardColumn(this.game, move.location.id).discardMoves)
    moves.push(this.rules().startRule(RuleId.PlayerTurn))

    return moves
  }
}
