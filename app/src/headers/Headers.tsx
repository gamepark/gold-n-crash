/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/gold-n-cash/rules/RuleId'
import { ComponentType } from 'react'
import { ObserveHeader } from './ObserveHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.Observe]: ObserveHeader,
  [RuleId.PlayerTurn]: () => <>PlayerTurn</>,
  [RuleId.Bombing]: () => <>Bombing</>,
  [RuleId.Boarding]: () => <>Boarding</>,
  [RuleId.Fishing]: () => <>Fishing</>,
  [RuleId.Strengthen]: () => <>Strengthen</>,
  [RuleId.Secure]: () => <>Secure</>,
  [RuleId.CrackTheTreasureChest]: () => <>CrackTheTreasureChest</>,
  [RuleId.Maneuver]: () => <>Maneuver</>,
  [RuleId.Recall]: () => <>Recall</>,
  [RuleId.Loot]: () => <>Loot</>,
  [RuleId.EndOfCardResolution]: () => <>EndOfCardResolution</>
}
