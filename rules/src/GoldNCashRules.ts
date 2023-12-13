import { hideFront, hideFrontToOthers, MaterialItem, PositiveSequenceStrategy, SecretMaterialRules } from '@gamepark/rules-api'
import { Flag } from './material/Flag'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { BoardingRule } from './rules/BoardingRule'
import { BombingRule } from './rules/BombingRule'
import { CrackTheTreasureChestRule } from './rules/CrackTheTreasureChestRule'
import { FishingRule } from './rules/FishingRule'
import { LootRule } from './rules/LootRule'
import { ManeuverRule } from './rules/ManeuverRule'
import { ObserveRule } from './rules/ObserveRule'
import { PlayerTurn } from './rules/PlayerTurn'
import { RecallRule } from './rules/RecallRule'
import { RuleId } from './rules/RuleId'
import { SecureRule } from './rules/SecureRule'
import { StrengthenRule } from './rules/StrengthenRule'


const hideFrontWhenRotated = (item: MaterialItem) => item.location.rotation? ['id.front']: []

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class GoldNCashRules extends SecretMaterialRules<Flag, MaterialType, LocationType> {

  locationsStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.CrewDeck]: new PositiveSequenceStrategy(),
      [LocationType.Column]: new PositiveSequenceStrategy(),
      [LocationType.Treasure]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.Card]: {
      [LocationType.Hand]: hideFrontToOthers,
      [LocationType.CrewDeck]: hideFront
    },
    [MaterialType.ZeppelinCard]: {
      [LocationType.Zeppelins]: hideFrontWhenRotated
    }
  }

  rules = {
    [RuleId.PlayerTurn]: PlayerTurn,
    [RuleId.Bombing]: BombingRule,
    [RuleId.Boarding]: BoardingRule,
    [RuleId.Fishing]: FishingRule,
    [RuleId.Strengthen]: StrengthenRule,
    [RuleId.Secure]: SecureRule,
    [RuleId.CrackTheTreasureChest]: CrackTheTreasureChestRule,
    [RuleId.Maneuver]: ManeuverRule,
    [RuleId.Recall]: RecallRule,
    [RuleId.Observe]: ObserveRule,
    [RuleId.Loot]: LootRule
  }
}
