<script setup lang="ts">
import { computed } from 'vue'
defineOptions({
  name: 'AppButton',
})

const props = defineProps<{
  label: string
  iconName: string
}>()

const icons = import.meta.glob('@/assets/*.svg', { eager: true, as: 'url' })
const iconPath = computed(() => {
  const path = `/src/assets/${props.iconName}.svg`
  return icons[path] as string
})
</script>

<template>
  <div class="button">
    <img :src="iconPath" />
    <p>{{ label }}</p>
  </div>
</template>

<style scoped>
.button {
  height: 60%;
  font-size: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 12px;
  text-transform: uppercase;
  transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  color: #fff;
  cursor: pointer;
}

.button::after {
  content: '';
  pointer-events: none;
  position: absolute;
  border: 0px solid transparent;
  width: 0%;
  height: 0%;
  bottom: 0%;
  right: 0%;
  border-bottom-width: 2px;
}

.button:hover {
  color: #fff;
}

.button:hover::after {
  border-color: #fff;
  transition:
    border-color 0.3s,
    width 0.2s,
    height 0.2s;
  width: 100%;
  height: 100%;
  transition-delay: 0s, 0.2s, 0s;
}

.button img {
  height: 16px;
  filter: invert(1);
}

.button p {
  font-size: 14px;
  color: #fff;
  text-align: center;
  white-space: nowrap;
}
</style>
