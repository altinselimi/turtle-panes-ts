<template>
	<div
		class="splitter__wrapper"
		@mousedown="onMouseDown"
		@mousemove="onMouseMove"
		@mouseup="onMouseUp"
	>
		<div class="splitter__target"></div>
	</div>
</template>
<script setup lang="ts">
import { useVuePaneStore } from "../state/vueAdapter";
import { ref, watchEffect } from "vue";

const { panes } = useVuePaneStore();

const isDragging = ref(false);
const startX = ref(0);
const startWidth = ref(0);
const endX = ref(0);

const onMouseDown = (e: MouseEvent) => {
	isDragging.value = true;
	startX.value = e.pageX;
	const target = e.target as HTMLElement;
	startWidth.value = target?.parentElement?.offsetWidth ?? 0;
};

const onMouseMove = (e: MouseEvent) => {
	if (!isDragging.value || !e.target) return;
	const diff = e.pageX - startX.value;
	const target = e.target as HTMLElement;
	if (!target || !target.parentElement) return;
	endX.value = target.parentElement.offsetWidth + diff;
};

const onMouseUp = () => {
	isDragging.value = false;
};

watchEffect(() => {});
</script>
<style lang="scss">
.splitter {
	&__wrapper {
		height: 100%;
		border: dashed 0.5px #ccc;
		position: relative;
		z-index: 9999;
		width: 1px;
	}
	&__target {
		cursor: ew-resize;
		width: 10px;
		height: 100%;
	}
}
</style>
