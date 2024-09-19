import { getEnumValues } from '@gamepark/rules-api'

export enum Zeppelin {
  PoulpirateZeppelin1 = 1,
  PoulpirateZeppelin2,
  PoulpirateZeppelin3,
  ChamouraiZeppelin1 = 51,
  ChamouraiZeppelin2,
  ChamouraiZeppelin3,
}

export enum ZeppelinState {
  PENDING_REVELATION = 2,
  VISIBLE_BY_ME,
  VISIBLE
}

export const getZeppelinStrength = (zeppelin: Zeppelin) => {
  if (zeppelin === undefined) return undefined
  return zeppelin % 50
}

export const poulpirateZeppelins = getEnumValues(Zeppelin).filter((zeppelin) => zeppelin < Zeppelin.ChamouraiZeppelin1)
export const chamouraiZeppelins = getEnumValues(Zeppelin).filter((zeppelin) => zeppelin >= Zeppelin.ChamouraiZeppelin1)

