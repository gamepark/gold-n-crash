import { isEnumValue } from '@gamepark/rules-api'

export enum PrestigiousGuest {
  PrestigiousGuest1 = 1,
  PrestigiousGuest2,
  PrestigiousGuest3,
  PrestigiousGuest4,
  PrestigiousGuest5,
  PrestigiousGuest6,
  PrestigiousGuest7,
  PrestigiousGuest8,
}

export const prestigiousGuests = Object.values(PrestigiousGuest).filter(isEnumValue)
