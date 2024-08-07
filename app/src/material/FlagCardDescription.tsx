/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import Chamourai from '../images/flag/chamourai/ChamouraiFlag.jpg'
import Poulpirate from '../images/flag/poulpirate/PoulpirateFlag.jpg'

export class FlagCardDescription extends CardDescription {
  height = 8.89
  borderRadius = 0.6

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
}

export const flagCardDescription = new FlagCardDescription()
