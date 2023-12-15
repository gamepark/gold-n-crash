/** @jsxImportSource @emotion/react */
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { gameCardDescription } from '../../material/GameCardDescription'
import { css } from '@emotion/react'

export class PlayerHandDescription extends LocationDescription {

  height = gameCardDescription.height + 3
  width = 35
  borderRadius = gameCardDescription.borderRadius + 0.1

  getExtraCss(_location: Location, _context: LocationContext) {
    return css`
      border: 0.2em solid green;
      background-color: rgba(0, 128, 0, 0.6);
    `
  }

  getLocations({ player }: MaterialContext): Location[] {
    if (!player) return []
    return [{
      type: LocationType.Hand,
      player
    }]
  }

  coordinates = { x: -33, y: 20.5, z: 10 }
}
