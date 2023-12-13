/** @jsxImportSource @emotion/react */
import { CardDescription, ItemContext } from '@gamepark/react-game'
import PrestigiousGuest1 from '../images/prestigious-guest/PrestigiousGuest1.jpg'
import PrestigiousGuest2 from '../images/prestigious-guest/PrestigiousGuest2.jpg'
import PrestigiousGuest3 from '../images/prestigious-guest/PrestigiousGuest3.jpg'
import PrestigiousGuest4 from '../images/prestigious-guest/PrestigiousGuest4.jpg'
import PrestigiousGuest5 from '../images/prestigious-guest/PrestigiousGuest5.jpg'
import PrestigiousGuest6 from '../images/prestigious-guest/PrestigiousGuest6.jpg'
import PrestigiousGuest7 from '../images/prestigious-guest/PrestigiousGuest7.jpg'
import PrestigiousGuest8 from '../images/prestigious-guest/PrestigiousGuest8.jpg'
import { MaterialItem } from '@gamepark/rules-api'
import { PrestigiousGuest } from '@gamepark/gold-n-cash/material/PrestigiousGuest'

export class PrestigiousGuestCardDescription extends CardDescription {
  height = 8.89
  borderRadius = 0.5

  images = {
    [PrestigiousGuest.PrestigiousGuest1]: PrestigiousGuest1,
    [PrestigiousGuest.PrestigiousGuest2]: PrestigiousGuest2,
    [PrestigiousGuest.PrestigiousGuest3]: PrestigiousGuest3,
    [PrestigiousGuest.PrestigiousGuest4]: PrestigiousGuest4,
    [PrestigiousGuest.PrestigiousGuest5]: PrestigiousGuest5,
    [PrestigiousGuest.PrestigiousGuest6]: PrestigiousGuest6,
    [PrestigiousGuest.PrestigiousGuest7]: PrestigiousGuest7,
    [PrestigiousGuest.PrestigiousGuest8]: PrestigiousGuest8,
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    const { player } = context
    return player === item.location.player? 0: 180
  }
}

export const prestigiousGuestCardDescription = new PrestigiousGuestCardDescription()