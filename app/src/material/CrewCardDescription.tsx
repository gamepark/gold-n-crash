/** @jsxImportSource @emotion/react */
import { CardDescription } from '@gamepark/react-game'
import { Crew } from '@gamepark/gold-n-cash/material/Crew'
import PoulpirateBlueCrew1 from '../images/crew/poulpirate/PoulpirateBlueCrew1.jpg'
import PoulpirateBlueCrew2 from '../images/crew/poulpirate/PoulpirateBlueCrew2.jpg'
import PoulpirateBlueCrew3 from '../images/crew/poulpirate/PoulpirateBlueCrew3.jpg'
import PoulpirateGreenCrew1 from '../images/crew/poulpirate/PoulpirateGreenCrew1.jpg'
import PoulpirateGreenCrew2 from '../images/crew/poulpirate/PoulpirateGreenCrew2.jpg'
import PoulpirateGreenCrew3 from '../images/crew/poulpirate/PoulpirateGreenCrew3.jpg'
import PoulpirateBrownCrew1 from '../images/crew/poulpirate/PoulpirateBrownCrew1.jpg'
import PoulpirateBrownCrew2 from '../images/crew/poulpirate/PoulpirateBrownCrew2.jpg'
import PoulpirateBrownCrew3 from '../images/crew/poulpirate/PoulpirateBrownCrew3.jpg'
import PoulpiratePurpleCrew1 from '../images/crew/poulpirate/PoulpiratePurpleCrew1.jpg'
import PoulpiratePurpleCrew2 from '../images/crew/poulpirate/PoulpiratePurpleCrew2.jpg'
import PoulpiratePurpleCrew3 from '../images/crew/poulpirate/PoulpiratePurpleCrew3.jpg'
import PoulpirateRedCrew1 from '../images/crew/poulpirate/PoulpirateRedCrew1.jpg'
import PoulpirateRedCrew2 from '../images/crew/poulpirate/PoulpirateRedCrew2.jpg'
import PoulpirateRedCrew3 from '../images/crew/poulpirate/PoulpirateRedCrew3.jpg'
import PoulpirateGold4 from '../images/crew/poulpirate/PoulpirateGold4.jpg'
import PoulpirateGold6 from '../images/crew/poulpirate/PoulpirateGold6.jpg'
import PoulpirateCrewBack from '../images/crew/poulpirate/PoulpirateCrewBack.jpg'
import ChamouraiBlueCrew1 from '../images/crew/chamourai/ChamouraiBlueCrew1.jpg'
import ChamouraiBlueCrew2 from '../images/crew/chamourai/ChamouraiBlueCrew2.jpg'
import ChamouraiBlueCrew3 from '../images/crew/chamourai/ChamouraiBlueCrew3.jpg'
import ChamouraiGreenCrew1 from '../images/crew/chamourai/ChamouraiGreenCrew1.jpg'
import ChamouraiGreenCrew2 from '../images/crew/chamourai/ChamouraiGreenCrew2.jpg'
import ChamouraiGreenCrew3 from '../images/crew/chamourai/ChamouraiGreenCrew3.jpg'
import ChamouraiBrownCrew1 from '../images/crew/chamourai/ChamouraiBrownCrew1.jpg'
import ChamouraiBrownCrew2 from '../images/crew/chamourai/ChamouraiBrownCrew2.jpg'
import ChamouraiBrownCrew3 from '../images/crew/chamourai/ChamouraiBrownCrew3.jpg'
import ChamouraiPurpleCrew1 from '../images/crew/chamourai/ChamouraiPurpleCrew1.jpg'
import ChamouraiPurpleCrew2 from '../images/crew/chamourai/ChamouraiPurpleCrew2.jpg'
import ChamouraiPurpleCrew3 from '../images/crew/chamourai/ChamouraiPurpleCrew3.jpg'
import ChamouraiRedCrew1 from '../images/crew/chamourai/ChamouraiRedCrew1.jpg'
import ChamouraiRedCrew2 from '../images/crew/chamourai/ChamouraiRedCrew2.jpg'
import ChamouraiRedCrew3 from '../images/crew/chamourai/ChamouraiRedCrew3.jpg'
import ChamouraiGold4 from '../images/crew/chamourai/ChamouraiGold4.jpg'
import ChamouraiGold6 from '../images/crew/chamourai/ChamouraiGold6.jpg'
import ChamouraiCrewBack from '../images/crew/chamourai/ChamouraiCrewBack.jpg'
import { Flag } from '@gamepark/gold-n-cash/material/Flag'

export class CrewCardDescription extends CardDescription {
  height = 8.89
  borderRadius = 0.5

  backImages = {
    [Flag.Poulpirate]: PoulpirateCrewBack,
    [Flag.Chamourai]: ChamouraiCrewBack,
  }

  images = {
    [Crew.PoulpirateBlueCrew1]: PoulpirateBlueCrew1,
    [Crew.PoulpirateBlueCrew2]: PoulpirateBlueCrew2,
    [Crew.PoulpirateBlueCrew3]: PoulpirateBlueCrew3,
    [Crew.PoulpirateGreenCrew1]: PoulpirateGreenCrew1,
    [Crew.PoulpirateGreenCrew2]: PoulpirateGreenCrew2,
    [Crew.PoulpirateGreenCrew3]: PoulpirateGreenCrew3,
    [Crew.PoulpirateBrownCrew1]: PoulpirateBrownCrew1,
    [Crew.PoulpirateBrownCrew2]: PoulpirateBrownCrew2,
    [Crew.PoulpirateBrownCrew3]: PoulpirateBrownCrew3,
    [Crew.PoulpiratePurpleCrew1]: PoulpiratePurpleCrew1,
    [Crew.PoulpiratePurpleCrew2]: PoulpiratePurpleCrew2,
    [Crew.PoulpiratePurpleCrew3]: PoulpiratePurpleCrew3,
    [Crew.PoulpirateRedCrew1]: PoulpirateRedCrew1,
    [Crew.PoulpirateRedCrew2]: PoulpirateRedCrew2,
    [Crew.PoulpirateRedCrew3]: PoulpirateRedCrew3,
    [Crew.PoulpirateGold4]: PoulpirateGold4,
    [Crew.PoulpirateGold6]: PoulpirateGold6,
    [Crew.ChamouraiBlueCrew1]: ChamouraiBlueCrew1,
    [Crew.ChamouraiBlueCrew2]: ChamouraiBlueCrew2,
    [Crew.ChamouraiBlueCrew3]: ChamouraiBlueCrew3,
    [Crew.ChamouraiGreenCrew1]: ChamouraiGreenCrew1,
    [Crew.ChamouraiGreenCrew2]: ChamouraiGreenCrew2,
    [Crew.ChamouraiGreenCrew3]: ChamouraiGreenCrew3,
    [Crew.ChamouraiBrownCrew1]: ChamouraiBrownCrew1,
    [Crew.ChamouraiBrownCrew2]: ChamouraiBrownCrew2,
    [Crew.ChamouraiBrownCrew3]: ChamouraiBrownCrew3,
    [Crew.ChamouraiPurpleCrew1]: ChamouraiPurpleCrew1,
    [Crew.ChamouraiPurpleCrew2]: ChamouraiPurpleCrew2,
    [Crew.ChamouraiPurpleCrew3]: ChamouraiPurpleCrew3,
    [Crew.ChamouraiRedCrew1]: ChamouraiRedCrew1,
    [Crew.ChamouraiRedCrew2]: ChamouraiRedCrew2,
    [Crew.ChamouraiRedCrew3]: ChamouraiRedCrew3,
    [Crew.ChamouraiGold4]: ChamouraiGold4,
    [Crew.ChamouraiGold6]: ChamouraiGold6,
  }
}

export const crewCardDescription = new CrewCardDescription()