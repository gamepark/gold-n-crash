/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import Chamourai from '../images/flag/chamourai/ChamouraiFlag.jpg'
import Poulpirate from '../images/flag/poulpirate/PoulpirateFlag.jpg'

export class FlagCardDescription extends CardDescription {

  getStaticItems({ rules: { players } }: MaterialContext) {
    return players.map(player => ({
      id: player,
      location: { type: LocationType.Flag, player }
    }))
  }

  images = {
    [Flag.Poulpirate]: Poulpirate,
    [Flag.Chamourai]: Chamourai
  }
}

export const flagCardDescription = new FlagCardDescription()
