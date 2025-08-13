import { type SquareKey } from 'vue3-chessboard'

export type BoardProps = {
  fen: string
  firstMove: {
    from: SquareKey
    to: SquareKey
  }
}
