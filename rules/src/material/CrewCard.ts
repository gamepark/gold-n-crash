import { RuleId } from '../rules/RuleId'
import { Card, isBlue, isBrown, isGreen, isPurple, isRed } from './Card'

export const getPlayEffect = (c: Card) => {
  if (isRed(c)) return RuleId.Bombing
  if (isBlue(c)) return RuleId.Boarding
  if (isPurple(c)) return RuleId.Fishing
  if (isGreen(c)) return RuleId.Strengthen
  if (isBrown(c)) return RuleId.Secure

  return undefined
}

export const getCardColorFinder = (c: Card) => {
  if (isRed(c)) return isRed
  if (isBlue(c)) return isBlue
  if (isPurple(c)) return isPurple
  if (isGreen(c)) return isGreen
  if (isBrown(c)) return isBrown

  return () => false
}

export const getDiscardEffect = (c: Card) => {
  if (isRed(c)) return RuleId.CrackTheTreasureChest
  if (isBlue(c)) return RuleId.Manoeuvre
  if (isPurple(c)) return RuleId.Recall
  if (isGreen(c)) return RuleId.Observe
  if (isBrown(c)) return RuleId.Loot

  return undefined
}

export const CardGold = {
  [Card.PoulpirateBlueCrew1]: 1,
  [Card.PoulpirateBlueCrew2]: 2,
  [Card.PoulpirateBlueCrew3]: 3,
  [Card.PoulpirateGreenCrew1]: 1,
  [Card.PoulpirateGreenCrew2]: 2,
  [Card.PoulpirateGreenCrew3]: 3,
  [Card.PoulpirateBrownCrew1]: 1,
  [Card.PoulpirateBrownCrew2]: 2,
  [Card.PoulpirateBrownCrew3]: 3,
  [Card.PoulpiratePurpleCrew1]: 1,
  [Card.PoulpiratePurpleCrew2]: 2,
  [Card.PoulpiratePurpleCrew3]: 3,
  [Card.PoulpirateRedCrew1]: 1,
  [Card.PoulpirateRedCrew2]: 2,
  [Card.PoulpirateRedCrew3]: 3,
  [Card.PoulpirateGold4]: 4,
  [Card.PoulpirateGold6]: 6,
  [Card.ChamouraiBlueCrew1]: 1,
  [Card.ChamouraiBlueCrew2]: 2,
  [Card.ChamouraiBlueCrew3]: 3,
  [Card.ChamouraiGreenCrew1]: 1,
  [Card.ChamouraiGreenCrew2]: 2,
  [Card.ChamouraiGreenCrew3]: 3,
  [Card.ChamouraiBrownCrew1]: 1,
  [Card.ChamouraiBrownCrew2]: 2,
  [Card.ChamouraiBrownCrew3]: 3,
  [Card.ChamouraiPurpleCrew1]: 1,
  [Card.ChamouraiPurpleCrew2]: 2,
  [Card.ChamouraiPurpleCrew3]: 3,
  [Card.ChamouraiRedCrew1]: 1,
  [Card.ChamouraiRedCrew2]: 2,
  [Card.ChamouraiRedCrew3]: 3,
  [Card.ChamouraiGold4]: 4,
  [Card.ChamouraiGold6]: 6,
  [Card.PrestigiousGuest1]: 5,
  [Card.PrestigiousGuest2]: 4,
  [Card.PrestigiousGuest3]: 5,
  [Card.PrestigiousGuest4]: 6,
  [Card.PrestigiousGuest5]: 5,
  [Card.PrestigiousGuest6]: 5,
  [Card.PrestigiousGuest7]: 5,
  [Card.PrestigiousGuest8]: 5,
}
