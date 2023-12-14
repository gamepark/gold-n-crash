import { isEnumValue } from '@gamepark/rules-api'

export enum Zeppelin {
  PoulpirateZeppelin1 = 1,
  PoulpirateZeppelin2,
  PoulpirateZeppelin3,
  ChamouraiZeppelin1 = 51,
  ChamouraiZeppelin2,
  ChamouraiZeppelin3,
}

export const getZeppelinStrength = (zeppelin: Zeppelin) => {
  if (zeppelin === undefined) return undefined
  return zeppelin % 50
}

export const poulpirateZeppelins = Object.values(Zeppelin).filter(isEnumValue).filter((zeppelin) => zeppelin < Zeppelin.ChamouraiZeppelin1)
export const chamouraiZeppelins = Object.values(Zeppelin).filter(isEnumValue).filter((zeppelin) => zeppelin >= Zeppelin.ChamouraiZeppelin1  )

