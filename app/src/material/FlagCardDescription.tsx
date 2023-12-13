/** @jsxImportSource @emotion/react */
import { CardDescription, ItemContext, MaterialContext } from '@gamepark/react-game'
import Poulpirate from '../images/flag/poulpirate/PoulpirateFlag.jpg'
import Chamourai from '../images/flag/chamourai/ChamouraiFlag.jpg'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'
import { MaterialItem } from '@gamepark/rules-api'
import { LocationType } from '@gamepark/gold-n-cash/material/LocationType'

export class FlagCardDescription extends CardDescription {
  height = 8.89
  borderRadius = 0.5

  getStaticItems(context: MaterialContext): MaterialItem[] {
    const { rules: { players } } = context
    return players.map((player) => ({
      id: player,
      location: {
        type: LocationType.Flag
      }
    }))
  }

  images = {
    [Flag.Poulpirate]: Poulpirate,
    [Flag.Chamourai]: Chamourai
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const { player } = context
    return player === item.id? 90: -90
  }
}

export const flagCardDescription = new FlagCardDescription()