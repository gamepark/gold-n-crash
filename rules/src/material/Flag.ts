import { getEnumValues } from '@gamepark/rules-api'

export enum Flag {
  Poulpirate = 1,
  Chamourai
}

export const flags = getEnumValues(Flag)
