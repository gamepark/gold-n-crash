/** @jsxImportSource @emotion/react */
import { PrestigiousGuest } from '@gamepark/gold-n-crash/material/Card'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { CrewCardHelp, HiddenCrewCardHelp } from './CrewCardHelp'
import { HiddenPrestigiousGuestHelp, PrestigiousGuestHelp } from './PrestigiousGuestHelp'

export const GameCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (!item.id.front) return <HiddenCardHelp {...props} />
  return <VisibleCardHelp { ...props } />
}

const HiddenCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (item.id.back === PrestigiousGuest.PrestigiousGuest) return <HiddenPrestigiousGuestHelp { ...props } />
  return <HiddenCrewCardHelp { ...props } />
}

const VisibleCardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  if (item.id.back === PrestigiousGuest.PrestigiousGuest) return <PrestigiousGuestHelp { ...props } />
  return <CrewCardHelp { ...props } />
}
