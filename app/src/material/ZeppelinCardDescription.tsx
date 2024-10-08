/** @jsxImportSource @emotion/react */
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { Zeppelin, ZeppelinState } from '@gamepark/gold-n-crash/material/Zeppelin'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import ChamouraiZeppelin1 from '../images/zeppelin/chamourai/ChamouraiZeppelin1.jpg'
import ChamouraiZeppelin2 from '../images/zeppelin/chamourai/ChamouraiZeppelin2.jpg'
import ChamouraiZeppelin3 from '../images/zeppelin/chamourai/ChamouraiZeppelin3.jpg'
import ChamouraiZeppelinBack from '../images/zeppelin/chamourai/ChamouraiZeppelinBack.jpg'
import PoulpirateZeppelin1 from '../images/zeppelin/poulpirate/PoulpirateZeppelin1.jpg'
import PoulpirateZeppelin2 from '../images/zeppelin/poulpirate/PoulpirateZeppelin2.jpg'
import PoulpirateZeppelin3 from '../images/zeppelin/poulpirate/PoulpirateZeppelin3.jpg'
import PoulpirateZeppelinBack from '../images/zeppelin/poulpirate/PoulpirateZeppelinBack.jpg'
import { ZeppelinCardHelp } from './help/ZeppelinCardHelp'

export class ZeppelinCardDescription extends CardDescription {
  width = 8.8
  height = 6.3

  backImages = {
    [Flag.Poulpirate]: PoulpirateZeppelinBack,
    [Flag.Chamourai]: ChamouraiZeppelinBack
  }

  images = {
    [Zeppelin.PoulpirateZeppelin1]: PoulpirateZeppelin1,
    [Zeppelin.PoulpirateZeppelin2]: PoulpirateZeppelin2,
    [Zeppelin.PoulpirateZeppelin3]: PoulpirateZeppelin3,
    [Zeppelin.ChamouraiZeppelin1]: ChamouraiZeppelin1,
    [Zeppelin.ChamouraiZeppelin2]: ChamouraiZeppelin2,
    [Zeppelin.ChamouraiZeppelin3]: ChamouraiZeppelin3
  }

  isFlipped(item: Partial<MaterialItem>, { player }: MaterialContext) {
    switch (item.location?.rotation) {
      case ZeppelinState.VISIBLE:
        return false
      case ZeppelinState.PENDING_REVELATION:
      case ZeppelinState.VISIBLE_BY_ME:
        return player !== item.location?.player
      default:
        return true
    }
  }

  isFlippedOnTable(item: Partial<MaterialItem>, context: MaterialContext) {
    return item.location?.rotation === ZeppelinState.VISIBLE_BY_ME || super.isFlippedOnTable(item, context)
  }

  help = ZeppelinCardHelp
}

export const zeppelinCardDescription = new ZeppelinCardDescription()
