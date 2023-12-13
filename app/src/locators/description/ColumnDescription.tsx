/** @jsxImportSource @emotion/react */
import { LocationContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { zeppelinCardDescription } from '../../material/ZeppelinCardDescription'
import { Location } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'
import times from 'lodash/times'
import { gameCardDescription } from '../../material/GameCardDescription'
import { css, Interpolation, Theme } from '@emotion/react'

export class ColumnDescription extends LocationDescription {

  height = gameCardDescription.height * 2
  width = gameCardDescription.width + 0.5
  borderRadius = gameCardDescription.borderRadius + 0.1

  getExtraCss(_location: Location<number, number>, _context: LocationContext<number, number, number>): Interpolation<Theme> {
    return css`
      background-color: rgba(0, 128, 0, 0.6);
    `
  }

  getLocations({ player }: MaterialContext): Location[] {
    if (!player) return []
    return times(3, (id) => ({
      type: LocationType.Column,
      id: id + 1,
      player,
    }))
  }

  getCoordinates(location: Location) {
    return {
      x: -18.8 + ((zeppelinCardDescription.height + 1) * location.id - 1),
      y: 26,
      z: 0,
    }
  }
}
