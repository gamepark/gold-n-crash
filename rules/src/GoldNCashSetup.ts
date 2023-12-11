import { MaterialGameSetup } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'
import { GoldNCashRules } from './GoldNCashRules'
import { GoldNCashOptions } from './GoldNCashOptions'
import { chamouraiCrew, poulpirateCrew } from './material/Crew'
import { Flag } from './material/Flag'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PrestigiousGuest, prestigiousGuests } from './material/PrestigiousGuest'
import { chamouraiZeppelins, poulpirateZeppelins } from './material/Zeppelin'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class GoldNCashSetup extends MaterialGameSetup<Flag, MaterialType, LocationType, GoldNCashOptions> {
  Rules = GoldNCashRules

  setupMaterial(options: GoldNCashOptions) {
    this.setupPlayers(options)
  }

  setupPlayers(options: GoldNCashOptions) {
    const guests = shuffle(prestigiousGuests)
    return options.players.forEach((player) => this.setupPlayer(player.id, guests))
  }

  setupPlayer(playerId: Flag, guests: PrestigiousGuest[]) {
    this.setupZeppelins(playerId)
    this.setupGuests(playerId, guests)
    this.setupCrew(playerId)
  }

  setupCrew(playerId: Flag) {
    const crew = shuffle(playerId === Flag.Chamourai ? chamouraiCrew : poulpirateCrew)

    // DECK
    this
      .material(MaterialType.CrewCard)
      .createItems(
        crew.map((c) => ({
          id: { front: c, back: playerId },
          location: {
            type: LocationType.CrewDeck,
            player: playerId
          }
        }))
      )

    // DISCARD 5 CARDS
    this
      .material(MaterialType.CrewCard)
      .location(LocationType.CrewDeck)
      .player(playerId)
      .sort(card => -card.location.x!)
      .limit(5)
      .moveItems({
        type: LocationType.Discard,
        player: playerId
      })

    // DRAW 5 CARDS
    this
      .material(MaterialType.CrewCard)
      .location(LocationType.CrewDeck)
      .player(playerId)
      .sort(card => -card.location.x!)
      .limit(5)
      .moveItems({
        type: LocationType.Hand,
        player: playerId
      })


  }

  setupGuests(playerId: Flag, guests: PrestigiousGuest[]) {
    const playerGuests = guests.splice(0, 3)
    this
      .material(MaterialType.PrestigiousGuestCard)
      .createItems(
        playerGuests.map((g) => ({
          id: g,
          location: {
            type: LocationType.PrestigiousGuests,
            player: playerId
          }
        }))
      )
  }

  setupZeppelins(playerId: Flag) {
    const zeppelins = shuffle(playerId === Flag.Chamourai ? chamouraiZeppelins : poulpirateZeppelins)
    this
      .material(MaterialType.ZeppelinCard)
      .createItems(
        zeppelins.map((z) => ({
          id: { front: z, back: playerId },
          location: {
            type: LocationType.Zeppelins,
            player: playerId,
            rotation: true
          }
        }))
      )
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}
