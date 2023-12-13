import { isEnumValue } from '@gamepark/rules-api'

export enum Card {
  PoulpirateBlueCrew1 = 1,
  PoulpirateBlueCrew2,
  PoulpirateBlueCrew3,
  PoulpirateGreenCrew1,
  PoulpirateGreenCrew2,
  PoulpirateGreenCrew3,
  PoulpirateBrownCrew1,
  PoulpirateBrownCrew2,
  PoulpirateBrownCrew3,
  PoulpiratePurpleCrew1,
  PoulpiratePurpleCrew2,
  PoulpiratePurpleCrew3,
  PoulpirateRedCrew1,
  PoulpirateRedCrew2,
  PoulpirateRedCrew3,
  PoulpirateGold4,
  PoulpirateGold6 ,
  ChamouraiBlueCrew1 = 100,
  ChamouraiBlueCrew2,
  ChamouraiBlueCrew3,
  ChamouraiGreenCrew1,
  ChamouraiGreenCrew2,
  ChamouraiGreenCrew3,
  ChamouraiBrownCrew1,
  ChamouraiBrownCrew2,
  ChamouraiBrownCrew3,
  ChamouraiPurpleCrew1,
  ChamouraiPurpleCrew2,
  ChamouraiPurpleCrew3,
  ChamouraiRedCrew1,
  ChamouraiRedCrew2,
  ChamouraiRedCrew3,
  ChamouraiGold4,
  ChamouraiGold6 ,
  PrestigiousGuest1 = 500,
  PrestigiousGuest2,
  PrestigiousGuest3,
  PrestigiousGuest4,
  PrestigiousGuest5,
  PrestigiousGuest6,
  PrestigiousGuest7,
  PrestigiousGuest8,
}

export const isPoulpirateCrew = (c: Card) => c < Card.ChamouraiBlueCrew1
export const poulpirateCrew = Object.values(Card).filter(isEnumValue).filter(isPoulpirateCrew)

export const isChamouraiCrew = (c: Card) => c >= Card.ChamouraiBlueCrew1 && c < Card.PrestigiousGuest1
export const chamouraiCrew = Object.values(Card).filter(isEnumValue).filter(isChamouraiCrew)

export const isPrestigiousGuest = (c: Card) => c >= Card.PrestigiousGuest1
export const prestigiousGuests = Object.values(Card).filter(isEnumValue).filter(isPrestigiousGuest)

export const PoulpirateDeck = {
  [Card.PoulpirateBlueCrew1]: 3,
  [Card.PoulpirateBlueCrew2]: 2,
  [Card.PoulpirateBlueCrew3]: 1,
  [Card.PoulpirateGreenCrew1]: 3,
  [Card.PoulpirateGreenCrew2]: 2,
  [Card.PoulpirateGreenCrew3]: 1,
  [Card.PoulpirateBrownCrew1]: 3,
  [Card.PoulpirateBrownCrew2]: 2,
  [Card.PoulpirateBrownCrew3]: 1,
  [Card.PoulpiratePurpleCrew1]: 3,
  [Card.PoulpiratePurpleCrew2]: 2,
  [Card.PoulpiratePurpleCrew3]: 1,
  [Card.PoulpirateRedCrew1]: 3,
  [Card.PoulpirateRedCrew2]: 2,
  [Card.PoulpirateRedCrew3]: 1,
  [Card.PoulpirateGold4]: 5,
  [Card.PoulpirateGold6]: 1
}
export const ChamouraiDeck = {
  [Card.ChamouraiBlueCrew1]: 3,
  [Card.ChamouraiBlueCrew2]: 2,
  [Card.ChamouraiBlueCrew3]: 1,
  [Card.ChamouraiGreenCrew1]: 3,
  [Card.ChamouraiGreenCrew2]: 2,
  [Card.ChamouraiGreenCrew3]: 1,
  [Card.ChamouraiBrownCrew1]: 3,
  [Card.ChamouraiBrownCrew2]: 2,
  [Card.ChamouraiBrownCrew3]: 1,
  [Card.ChamouraiPurpleCrew1]: 3,
  [Card.ChamouraiPurpleCrew2]: 2,
  [Card.ChamouraiPurpleCrew3]: 1,
  [Card.ChamouraiRedCrew1]: 3,
  [Card.ChamouraiRedCrew2]: 2,
  [Card.ChamouraiRedCrew3]: 1,
  [Card.ChamouraiGold4]: 5,
  [Card.ChamouraiGold6]: 1
}
