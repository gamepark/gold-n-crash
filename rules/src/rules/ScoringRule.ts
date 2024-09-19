import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class ScoringRule extends MaterialRulesPart {
  onRuleStart() {
    return [
      this.material(MaterialType.Card).location(LocationType.Treasure).moveItemsAtOnce({ rotation: false }),
      this.endGame()
    ]
  }
}
