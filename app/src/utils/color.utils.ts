import { Card, isBlue, isBrown, isGold, isGreen, isPurple, isRed } from '@gamepark/gold-n-crash/material/Card'
import { TFunction } from 'i18next'


export const getColorText = (t: TFunction, c: Card) => {
  if (isGold(c)) return t('color.gold')
  if (isGreen(c)) return t('color.green')
  if (isRed(c)) return t('color.red')
  if (isBlue(c)) return t('color.blue')
  if (isPurple(c)) return t('color.purple')
  if (isBrown(c)) return t('color.brown')

  return ''
}