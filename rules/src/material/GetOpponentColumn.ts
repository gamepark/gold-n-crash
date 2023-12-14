export const getOpponentColumnIndex = (column: number) => {
  const id = column
  if (id === 1) return 3
  if (id === 3) return 1
  return 2
}
