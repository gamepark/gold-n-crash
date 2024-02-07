import { GoldNCashOptions } from '@gamepark/gold-n-crash/GoldNCashOptions'
import { GoldNCashSetup } from '@gamepark/gold-n-crash/GoldNCashSetup'
import { Card, prestigiousGuests } from '@gamepark/gold-n-crash/material/Card'
import { Flag } from '@gamepark/gold-n-crash/material/Flag'
import { LocationType } from '@gamepark/gold-n-crash/material/LocationType'
import { MaterialType } from '@gamepark/gold-n-crash/material/MaterialType'
import { Zeppelin } from '@gamepark/gold-n-crash/material/Zeppelin'
import shuffle from 'lodash/shuffle'

const me = Flag.Chamourai
const myHand = [Card.ChamouraiGold4, Card.ChamouraiPurpleCrew1, Card.ChamouraiBrownCrew2, Card.ChamouraiGreenCrew2, Card.ChamouraiGreenCrew3]
const opponentHand = [Card.PoulpirateGold4, Card.PoulpirateBrownCrew3, Card.PoulpirateBlueCrew2, Card.PoulpirateBlueCrew1, Card.PoulpirateRedCrew2]

export class TutorialSetup extends GoldNCashSetup {

  setupCrew(playerId: Flag) {
    this.setupCrewDeck(playerId)
    this.setupHand(playerId)
    if (playerId === Flag.Chamourai) {

      this.material(MaterialType.Card)
        .location(LocationType.CrewDeck)
        .id((id: any) => id.front === Card.ChamouraiBlueCrew3)
        .moveItem({
          type: LocationType.CrewDeck,
          player: playerId
        })

      this.material(MaterialType.Card)
        .location(LocationType.CrewDeck)
        .id((id: any) => id.front === Card.ChamouraiRedCrew1)
        .moveItem({
          type: LocationType.CrewDeck,
          player: playerId
        })
    }

    this.setupDiscard(playerId)
  }

  setupDiscard(playerId: Flag) {
    this
      .material(MaterialType.Card)
      .location(LocationType.CrewDeck)
      .player(playerId)
      .sort(card => card.location.x!)
      .limit(5)
      .moveItems({
        type: LocationType.Discard,
        player: playerId,
      })

  }

  getZeppelin(playerId: Flag) {
    if (playerId === me) return super.getZeppelin(playerId)
    const other = shuffle([Zeppelin.PoulpirateZeppelin2, Zeppelin.PoulpirateZeppelin3])
    return [
      other[0],
      Zeppelin.PoulpirateZeppelin1,
      other[1]
    ]
  }

  setupHand(playerId: Flag) {
    const cards = playerId === me? myHand: opponentHand
    for (const card of cards) {
      this
        .material(MaterialType.Card)
        .location(LocationType.CrewDeck)
        .player(playerId)
        .id((id: any) => id.front === card)
        .moveItem({
          type: LocationType.Hand,
          player: playerId
        })
    }
  }

  setupPlayers(options: GoldNCashOptions) {
    const guests = shuffle(prestigiousGuests)
    const ordered = [
      guests.find((g) => g === Card.PrestigiousGuest3)!,
      ...guests.filter((g) => g !== Card.PrestigiousGuest3)
    ]
    return options.players.forEach((player) => this.setupPlayer(player.id, ordered))
  }
}
