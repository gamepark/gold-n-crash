import { isEnumValue } from '@gamepark/rules-api'

export enum Zeppelin {
  PoulpirateZeppelin1 = 1,
  PoulpirateZeppelin2,
  PoulpirateZeppelin3,
  ChamouraiZeppelin1 = 50,
  ChamouraiZeppelin2,
  ChamouraiZeppelin3,
}

export const poulpirateZeppelins = Object.values(Zeppelin).filter(isEnumValue).filter((zeppelin) => zeppelin < Zeppelin.ChamouraiZeppelin1)
export const chamouraiZeppelins = Object.values(Zeppelin).filter(isEnumValue).filter((zeppelin) => zeppelin >= Zeppelin.ChamouraiZeppelin1  )

