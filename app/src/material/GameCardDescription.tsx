/** @jsxImportSource @emotion/react */
import { Card, isPrestigiousGuest } from '@gamepark/gold-n-cash/material/Card'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import ChamouraiBlueCrew1 from '../images/crew/chamourai/ChamouraiBlueCrew1.jpg'
import ChamouraiBlueCrew2 from '../images/crew/chamourai/ChamouraiBlueCrew2.jpg'
import ChamouraiBlueCrew3 from '../images/crew/chamourai/ChamouraiBlueCrew3.jpg'
import ChamouraiBrownCrew1 from '../images/crew/chamourai/ChamouraiBrownCrew1.jpg'
import ChamouraiBrownCrew2 from '../images/crew/chamourai/ChamouraiBrownCrew2.jpg'
import ChamouraiBrownCrew3 from '../images/crew/chamourai/ChamouraiBrownCrew3.jpg'
import ChamouraiCrewBack from '../images/crew/chamourai/ChamouraiCrewBack.jpg'
import ChamouraiGold4 from '../images/crew/chamourai/ChamouraiGold4.jpg'
import ChamouraiGold6 from '../images/crew/chamourai/ChamouraiGold6.jpg'
import ChamouraiGreenCrew1 from '../images/crew/chamourai/ChamouraiGreenCrew1.jpg'
import ChamouraiGreenCrew2 from '../images/crew/chamourai/ChamouraiGreenCrew2.jpg'
import ChamouraiGreenCrew3 from '../images/crew/chamourai/ChamouraiGreenCrew3.jpg'
import ChamouraiPurpleCrew1 from '../images/crew/chamourai/ChamouraiPurpleCrew1.jpg'
import ChamouraiPurpleCrew2 from '../images/crew/chamourai/ChamouraiPurpleCrew2.jpg'
import ChamouraiPurpleCrew3 from '../images/crew/chamourai/ChamouraiPurpleCrew3.jpg'
import ChamouraiRedCrew1 from '../images/crew/chamourai/ChamouraiRedCrew1.jpg'
import ChamouraiRedCrew2 from '../images/crew/chamourai/ChamouraiRedCrew2.jpg'
import ChamouraiRedCrew3 from '../images/crew/chamourai/ChamouraiRedCrew3.jpg'
import PoulpirateBlueCrew1 from '../images/crew/poulpirate/PoulpirateBlueCrew1.jpg'
import PoulpirateBlueCrew2 from '../images/crew/poulpirate/PoulpirateBlueCrew2.jpg'
import PoulpirateBlueCrew3 from '../images/crew/poulpirate/PoulpirateBlueCrew3.jpg'
import PoulpirateBrownCrew1 from '../images/crew/poulpirate/PoulpirateBrownCrew1.jpg'
import PoulpirateBrownCrew2 from '../images/crew/poulpirate/PoulpirateBrownCrew2.jpg'
import PoulpirateBrownCrew3 from '../images/crew/poulpirate/PoulpirateBrownCrew3.jpg'
import PoulpirateCrewBack from '../images/crew/poulpirate/PoulpirateCrewBack.jpg'
import PoulpirateGold4 from '../images/crew/poulpirate/PoulpirateGold4.jpg'
import PoulpirateGold6 from '../images/crew/poulpirate/PoulpirateGold6.jpg'
import PoulpirateGreenCrew1 from '../images/crew/poulpirate/PoulpirateGreenCrew1.jpg'
import PoulpirateGreenCrew2 from '../images/crew/poulpirate/PoulpirateGreenCrew2.jpg'
import PoulpirateGreenCrew3 from '../images/crew/poulpirate/PoulpirateGreenCrew3.jpg'
import PoulpiratePurpleCrew1 from '../images/crew/poulpirate/PoulpiratePurpleCrew1.jpg'
import PoulpiratePurpleCrew2 from '../images/crew/poulpirate/PoulpiratePurpleCrew2.jpg'
import PoulpiratePurpleCrew3 from '../images/crew/poulpirate/PoulpiratePurpleCrew3.jpg'
import PoulpirateRedCrew1 from '../images/crew/poulpirate/PoulpirateRedCrew1.jpg'
import PoulpirateRedCrew2 from '../images/crew/poulpirate/PoulpirateRedCrew2.jpg'
import PoulpirateRedCrew3 from '../images/crew/poulpirate/PoulpirateRedCrew3.jpg'
import PrestigiousGuest1 from '../images/prestigious-guest/PrestigiousGuest1.jpg'
import PrestigiousGuest2 from '../images/prestigious-guest/PrestigiousGuest2.jpg'
import PrestigiousGuest3 from '../images/prestigious-guest/PrestigiousGuest3.jpg'
import PrestigiousGuest4 from '../images/prestigious-guest/PrestigiousGuest4.jpg'
import PrestigiousGuest5 from '../images/prestigious-guest/PrestigiousGuest5.jpg'
import PrestigiousGuest6 from '../images/prestigious-guest/PrestigiousGuest6.jpg'
import PrestigiousGuest7 from '../images/prestigious-guest/PrestigiousGuest7.jpg'
import PrestigiousGuest8 from '../images/prestigious-guest/PrestigiousGuest8.jpg'
import { MaterialItem } from '@gamepark/rules-api'

export class GameCardDescription extends CardDescription {
  height = 8.89
  borderRadius = 0.5

  backImages = {
    [Flag.Poulpirate]: PoulpirateCrewBack,
    [Flag.Chamourai]: ChamouraiCrewBack,
  }

  images = {
    [Card.PoulpirateBlueCrew1]: PoulpirateBlueCrew1,
    [Card.PoulpirateBlueCrew2]: PoulpirateBlueCrew2,
    [Card.PoulpirateBlueCrew3]: PoulpirateBlueCrew3,
    [Card.PoulpirateGreenCrew1]: PoulpirateGreenCrew1,
    [Card.PoulpirateGreenCrew2]: PoulpirateGreenCrew2,
    [Card.PoulpirateGreenCrew3]: PoulpirateGreenCrew3,
    [Card.PoulpirateBrownCrew1]: PoulpirateBrownCrew1,
    [Card.PoulpirateBrownCrew2]: PoulpirateBrownCrew2,
    [Card.PoulpirateBrownCrew3]: PoulpirateBrownCrew3,
    [Card.PoulpiratePurpleCrew1]: PoulpiratePurpleCrew1,
    [Card.PoulpiratePurpleCrew2]: PoulpiratePurpleCrew2,
    [Card.PoulpiratePurpleCrew3]: PoulpiratePurpleCrew3,
    [Card.PoulpirateRedCrew1]: PoulpirateRedCrew1,
    [Card.PoulpirateRedCrew2]: PoulpirateRedCrew2,
    [Card.PoulpirateRedCrew3]: PoulpirateRedCrew3,
    [Card.PoulpirateGold4]: PoulpirateGold4,
    [Card.PoulpirateGold6]: PoulpirateGold6,
    [Card.ChamouraiBlueCrew1]: ChamouraiBlueCrew1,
    [Card.ChamouraiBlueCrew2]: ChamouraiBlueCrew2,
    [Card.ChamouraiBlueCrew3]: ChamouraiBlueCrew3,
    [Card.ChamouraiGreenCrew1]: ChamouraiGreenCrew1,
    [Card.ChamouraiGreenCrew2]: ChamouraiGreenCrew2,
    [Card.ChamouraiGreenCrew3]: ChamouraiGreenCrew3,
    [Card.ChamouraiBrownCrew1]: ChamouraiBrownCrew1,
    [Card.ChamouraiBrownCrew2]: ChamouraiBrownCrew2,
    [Card.ChamouraiBrownCrew3]: ChamouraiBrownCrew3,
    [Card.ChamouraiPurpleCrew1]: ChamouraiPurpleCrew1,
    [Card.ChamouraiPurpleCrew2]: ChamouraiPurpleCrew2,
    [Card.ChamouraiPurpleCrew3]: ChamouraiPurpleCrew3,
    [Card.ChamouraiRedCrew1]: ChamouraiRedCrew1,
    [Card.ChamouraiRedCrew2]: ChamouraiRedCrew2,
    [Card.ChamouraiRedCrew3]: ChamouraiRedCrew3,
    [Card.ChamouraiGold4]: ChamouraiGold4,
    [Card.ChamouraiGold6]: ChamouraiGold6,
    [Card.PrestigiousGuest1]: PrestigiousGuest1,
    [Card.PrestigiousGuest2]: PrestigiousGuest2,
    [Card.PrestigiousGuest3]: PrestigiousGuest3,
    [Card.PrestigiousGuest4]: PrestigiousGuest4,
    [Card.PrestigiousGuest5]: PrestigiousGuest5,
    [Card.PrestigiousGuest6]: PrestigiousGuest6,
    [Card.PrestigiousGuest7]: PrestigiousGuest7,
    [Card.PrestigiousGuest8]: PrestigiousGuest8,
  }

  getRotateZ(item: MaterialItem, context: ItemContext): number {
    if (!isPrestigiousGuest(item.id.front)) return super.getRotateZ(item, context)

    const { player } = context
    return player === item.location.player? 0: 180
  }
}

export const gameCardDescription = new GameCardDescription()
