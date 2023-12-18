import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Flag, flags } from './material/Flag'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: Flag }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type GoldNCashOptions = {
  players: PlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const GoldNCashOptionsSpec: OptionsSpec<GoldNCashOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('crew.choice'),
      values: flags,
      valueSpec: flag => ({ label: t => t(`player.${flag}`) })
    }
  }
}
