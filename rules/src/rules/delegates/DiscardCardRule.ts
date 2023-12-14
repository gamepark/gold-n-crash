import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { getDiscardEffect } from '../../material/CrewCard'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { DiscardEffectRule } from '../discard-effect/helper/DiscardEffectRule'
import { Memory } from '../Memory'

export class DiscardCardRule extends PlayerTurnRule {
  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = []
    const columnCards = this.columnCards
    for (let id = 1; id <= 3; id++) {
      const card = columnCards
        .locationId(id)
        .maxBy((item) => item.location.x!)

      if (card.length) {
        const discardEffectRule = new DiscardEffectRule(this.game, id)
        if (!discardEffectRule.canDiscard(card.getItem()!.id.front)) continue

        moves.push(
          card.moveItem({
            type: LocationType.Discard,
            player: this.player
          })
        )
      }
    }


    return moves
  }

  get columnCards() {
    return this.material(MaterialType.Card).location(LocationType.Column).player(this.player)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.Actions, (action) => (action ?? 0) + 1)
    const item = this.material(MaterialType.Card).getItem(move.itemIndex)!
    const discardRule =  getDiscardEffect(item.id.front)
    if (discardRule) {
      return [
        this.rules().startRule(discardRule)
      ]
    }
    return []
  }
}
