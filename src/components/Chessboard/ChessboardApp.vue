<script setup lang="ts">
import { TheChessboard, type BoardApi, type SquareKey } from 'vue3-chessboard'
import { Engine } from './Engine'
import 'vue3-chessboard/style.css'
import type { BoardProps } from './types'

defineProps<{
  initialFen: string
}>()

let boardAPI: BoardApi
let engine: Engine | undefined

const boardConfig = {
  coordinates: true,
  showCoordinates: true,
  showNotation: true,
}

function handleBoardCreated(boardApi: BoardApi) {
  boardAPI = boardApi
  engine = new Engine(boardAPI)
}

function alterPosition(position: BoardProps) {
  boardAPI.setPosition(position.fen)
  boardAPI.move({ from: position.firstMove.from, to: position.firstMove.to })
  engine?.updateEngineColor(boardAPI.getTurnColor())
}

function resetBoard() {
  boardAPI.resetBoard()
}

function getHint() {
  const bestMove = engine?.getBestMove()
  console.log(boardAPI.getTurnColor())
  if (bestMove) {
    boardAPI.drawMove(bestMove.slice(0, 2) as SquareKey, bestMove.slice(2, 4) as SquareKey, 'blue')
  }
}

function handleMove() {
  const fen = boardAPI.getFen()

  if (fen) engine?.sendPosition(fen)
}

defineExpose({ alterPosition, resetBoard, getHint })
</script>

<template>
  <TheChessboard
    :board-config="boardConfig"
    @board-created="handleBoardCreated"
    @move="handleMove"
  />
</template>
