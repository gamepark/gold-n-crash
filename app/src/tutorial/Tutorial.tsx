/** @jsxImportSource @emotion/react */
import {MaterialTutorial, TutorialStep} from '@gamepark/react-game'
import {TutorialSetup} from './TutorialSetup'
import {Flag} from "@gamepark/gold-n-crash/material/Flag";
import {MaterialType} from "@gamepark/gold-n-crash/material/MaterialType";
import {LocationType} from "@gamepark/gold-n-crash/material/LocationType";
import {Trans} from "react-i18next";
import {isMoveItemType} from "@gamepark/rules-api";
import {Card} from "@gamepark/gold-n-crash/material/Card";

const me = Flag.Chamourai
const opponent = Flag.Poulpirate

export class Tutorial extends MaterialTutorial<Flag, MaterialType, LocationType> {
  version = 1
  options = { players: [{ id: me }, { id: opponent }] }
  setup = new TutorialSetup()

  players = [{ id: me }, { id: opponent }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal.1"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal.2"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.you"><strong /></Trans>,
        position: { x: 0, y: 35}
      },
      focus: () => [
        { type: MaterialType.FlagCard, item: { id: Flag.Chamourai, location: { type: LocationType.Flag } }}
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.deck"><strong /></Trans>,
        position: { x: 30, y: 0}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.CrewDeck)
          .sort((item) => -item.location.x!)
          .limit(20)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard"><strong /></Trans>,
        position: { x: 0, y: 40}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Discard)
          .limit(10)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand"><strong /></Trans>,
        position: { x: 0, y: 35}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.zeppelin"><strong /></Trans>,
        position: { x: 0, y: 40}
      },
      focus: (game) => [
        this.material(game, MaterialType.ZeppelinCard)
          .player(me)
          .location(LocationType.Zeppelins)
      ]
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.actions"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draw"><strong /></Trans>,
        position: { x: 15, y: -15}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.CrewDeck)
          .sort((item) => -item.location.x!)
          .limit(1),
        this.location(LocationType.Hand).player(me)
      ],
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move)
          && move.location.type === LocationType.Hand
          && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.CrewDeck
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.place"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .id((id: any) => id.front === Card.ChamouraiGreenCrew3)
          .limit(1),
        this.location(LocationType.Column).id(1).player(me)
      ],
      move: {
        player: me,
        filter: (move, game) => isMoveItemType(MaterialType.Card)(move)
          && move.location.type === LocationType.Column
          && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.Hand && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.ChamouraiGreenCrew3
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.effect"><strong /></Trans>,
        position: { x: 0, y: 35}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Column)
          .locationId(1),
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .maxBy((item) => item.location.x!)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.1"><strong /></Trans>
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Column
            && move.location.id === 3
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.PoulpirateGold4
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.action.1"><strong /></Trans>,
        position: { x: 0, y: 40}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(opponent)
          .location(LocationType.Column)
          .locationId(3)
      ],
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Column
            && move.location.id === 2
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.PoulpirateBrownCrew3
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.action.2"><strong /></Trans>,
        position: { x: 0, y: 40}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(opponent)
          .location(LocationType.Column)
          .locationId(2)
      ],
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.Column
            && game.items[MaterialType.Card]![move.itemIndex].location.id === 3
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.PoulpirateGold4
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.treasure"><strong /></Trans>,
        position: { x: 0, y: 40}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(opponent)
          .location(LocationType.Treasure)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.column.rule"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .id((id: any) => id.front === Card.ChamouraiRedCrew1),
        this.location(LocationType.Column).player(me).id(2)
      ],
      move: {
        player: me,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Column
            && move.location.id === 2
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.ChamouraiRedCrew1
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.bombard"><strong /></Trans>,
        position: { x: 0, y: 5}
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.zeppelin.value"><strong /></Trans>,
        position: { x: -45, y: 30}
      },
      focus: (game) => [
        this.material(game, MaterialType.ZeppelinCard)
          .player(opponent)
          .location(LocationType.Zeppelins)
          .locationId(2)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.zeppelin.destroy"><strong /></Trans>,
        position: { x: -45, y: 30}
      },
      focus: (game) => [
        this.material(game, MaterialType.ZeppelinCard)
          .player(opponent)
          .location(LocationType.Zeppelins)
          .locationId(2)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.purple"><strong /></Trans>,
        position: { x: -10, y: 30}
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .id((id: any) => id.front === Card.ChamouraiPurpleCrew1),
        this.location(LocationType.Column).player(me).id(3)
      ],
      move: {
        player: me,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Column
            && move.location.id === 3
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.ChamouraiPurpleCrew1
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard.get"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Column)
          .id((id: any) => id.front === Card.ChamouraiPurpleCrew1),
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .maxBy((item) => item.location.x!),
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.2"><strong /></Trans>
      },
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Hand
            && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.CrewDeck
        }
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Hand
            && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.CrewDeck
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponent.draw"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.green"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .player(me)
          .location(LocationType.Hand)
          .id((id: any) => id.front === Card.ChamouraiGreenCrew2),
        this.location(LocationType.Column).player(me).id(1)
      ],
      move: {
        player: me,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.location.type === LocationType.Column
            && move.location.id === 1
            && game.items[MaterialType.Card]![move.itemIndex].location.type === LocationType.Hand
            && game.items[MaterialType.Card]![move.itemIndex].id.front === Card.ChamouraiGreenCrew2
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.draw.2"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.discard.3"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.guest"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.guest.condition"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.PrestigiousGuests)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.guest.secure"><strong /></Trans>,
        position: { x: 50, y: -20 }
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.PrestigiousGuests)
          .id((id: any) => id.front === Card.PrestigiousGuest3)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.guest.treasure"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.PrestigiousGuests)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.guest.lost"><strong /></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.PrestigiousGuests)
      ],
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.end.condition"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.click"><strong /></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.go"><strong /></Trans>
      }
    },
  ]
}
