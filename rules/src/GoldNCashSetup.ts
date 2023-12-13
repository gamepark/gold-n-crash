import { MaterialGameSetup } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'
import { GoldNCashRules } from './GoldNCashRules'
import { GoldNCashOptions } from './GoldNCashOptions'
import { Card, chamouraiCrew, ChamouraiDeck, poulpirateCrew, PoulpirateDeck, PrestigiousGuest, prestigiousGuests } from './material/Card'
import { Flag } from './material/Flag'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
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

  setupPlayer(playerId: Flag, guests: Card[]) {
    this.setupZeppelins(playerId)
    this.setupGuests(playerId, guests)
    this.setupCrew(playerId)
  }

  setupCrew(playerId: Flag) {
    const crews = playerId === Flag.Poulpirate ? poulpirateCrew : chamouraiCrew
    const deck = playerId === Flag.Poulpirate ? PoulpirateDeck : ChamouraiDeck
    const cards = crews
      .flatMap((c) => Array
        .from(Array(deck[c]))
        .map(() => ({
            id: {
              front: c,
              back: playerId,
            },
            location: {
              type: LocationType.CrewDeck,
              player: playerId,
            },
          }),
        ),
      )

    this.material(MaterialType.Card).createItems(cards)
    this.material(MaterialType.Card).location(LocationType.CrewDeck).player(playerId).shuffle()

    // DISCARD 5 CARDS
    this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(playerId)
      .sort(card => -card.location.x!)
      .limit(5)
      .moveItems({
        type: LocationType.Discard,
        player: playerId,
      })

    // DRAW 5 CARDS
    this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(playerId)
      .sort(card => -card.location.x!)
      .limit(5)
      .moveItems({
        type: LocationType.Hand,
        player: playerId,
      })


  }

  setupGuests(playerId: Flag, guests: Card[]) {
    const playerGuests = guests.splice(0, 3)
    this
      .material(MaterialType.Card)
      .createItems(
        playerGuests.map((g, index) => ({
          id: {
            front: g,
            back: PrestigiousGuest.PrestigiousGuest
          },
          location: {
            type: LocationType.PrestigiousGuests,
            id: index + 1,
            player: playerId,
          },
        })),
      )
  }

  setupZeppelins(playerId: Flag) {
    const zeppelins = shuffle(playerId === Flag.Chamourai ? chamouraiZeppelins : poulpirateZeppelins)
    this
      .material(MaterialType.ZeppelinCard)
      .createItems(
        zeppelins.map((z, index) => ({
          id: { front: z, back: playerId },
          location: {
            type: LocationType.Zeppelins,
            id: index + 1,
            player: playerId,
            rotation: true,
          },
        })),
      )
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}
