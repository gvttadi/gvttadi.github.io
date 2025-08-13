<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from './components/Button/Button.vue'
import Chessboard from './components/Chessboard/ChessboardApp.vue'
import Header from './components/Header/HeaderApp.vue'
import { puzzles } from './components/Chessboard/puzzles'

const puzzleIndex = ref(0)
const chessBoardRef = ref<InstanceType<typeof Chessboard> | null>(null)

onMounted(() => {
  const board = chessBoardRef.value
  if (board) {
    board.alterPosition(puzzles[0])
  }
})
function incrementPuzzleIndex() {
  if (puzzleIndex.value >= puzzles.length - 1) puzzleIndex.value = 0
  else puzzleIndex.value += 1

  const board = chessBoardRef.value
  board?.alterPosition(puzzles[puzzleIndex.value])
}

function resetPuzzle() {
  const board = chessBoardRef.value
  board?.resetBoard()
  board?.alterPosition(puzzles[puzzleIndex.value])
}

function getHint() {
  const board = chessBoardRef.value
  board?.getHint()
}
</script>

<template>
  <Header />
  <main>
    <Chessboard ref="chessBoardRef" :initialFen="puzzles[0].fen" />
    <div class="auxiliary-buttons-container">
      <Button label="Retry" iconName="retry" @click="resetPuzzle" />
      <Button label="Next Puzzle" iconName="next" @click="incrementPuzzleIndex" />
      <Button label="Hint" iconName="light-bulb" @click="getHint" />
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 480px;
  width: 100%;
  margin: auto auto 0;
}

.auxiliary-buttons-container {
  margin: 24px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media (min-width: 813px) {
  main {
    margin-top: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 48px;
    max-width: 1024px;
  }
  .auxiliary-buttons-container {
    flex-direction: column;
    align-items: center;
  }

  .auxiliary-buttons-container > * {
    width: 100%;
  }
}
</style>
