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

  isFlipped(item: Partial<MaterialItem>, context: MaterialContext): boolean {
    if (item.location?.rotation === true) return true

    switch (item.location?.rotation) {
      case ZeppelinState.VISIBLE:
        return false
      case ZeppelinState.PENDING_REVELATION:
        return !context.player || (context.player !== item.location?.player)
      case ZeppelinState.VISIBLE_BY_ME:
        return true
    }

    return super.isFlipped(item, context)
  }

  help = ZeppelinCardHelp
}

export const zeppelinCardDescription = new ZeppelinCardDescription()
