import { isEnumValue } from '@gamepark/rules-api'

export enum Flag {
  Poulpirate = 1,
  Chamourai
}

export const flags = Object.values(Flag).filter(isEnumValue)
