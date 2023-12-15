import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sumBy from 'lodash/sumBy'
import { CardGold } from '../../material/CrewCard'
import { Flag } from '../../material/Flag'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { ZeppelinState } from '../../material/Zeppelin'

export class Score extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: Flag) {
    super(game)
  }

  get hasAllZeppelinDestroyed() {
    return this
      .material(MaterialType.ZeppelinCard)
      .location(LocationType.Zeppelins)
      .player(this.player)
      .rotation(ZeppelinState.VISIBLE)
      .length === 3
  }

  get gold() {
    const items = this
      .material(MaterialType.Card)
      .location(LocationType.Treasure)
      .rotation(false)
      .getItems()

    return sumBy(items, (item) => CardGold[item.id.front])
  }

}
