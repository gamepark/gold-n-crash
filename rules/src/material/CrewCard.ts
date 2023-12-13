import { RuleId } from '../rules/RuleId'
import { Card, isBlue, isBrown, isGreen, isPurple, isRed } from './Card'

export const getPlayEffect = (c: Card) => {
  if (isRed(c)) return RuleId.Bombing
  if (isBlue(c)) return RuleId.Bombing
  if (isPurple(c)) return RuleId.Fishing
  if (isGreen(c)) return RuleId.Strengthen
  if (isBrown(c)) return RuleId.Secure

  return undefined
}

export const getDiscardEffect = (c: Card) => {
  if (isRed(c)) return RuleId.CrackTheTreasureChest
  if (isBlue(c)) return RuleId.Maneuver
  if (isPurple(c)) return RuleId.Recall
  if (isGreen(c)) return RuleId.Observe
  if (isBrown(c)) return RuleId.Loot

  return undefined
}