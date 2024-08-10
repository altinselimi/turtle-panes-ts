<template>
	<slot></slot>
	<Splitter />
</template>
<script setup lang="ts">
import Splitter from "./Splitter.vue";
import { useVuePaneStore } from "../state/vueAdapter";
import { watchEffect } from "vue";

const timeInMs = Date.now();
const store = useVuePaneStore();
const { panes, setPanes } = store;

setPanes([
	...panes.value,
	{
		id: timeInMs,
		width: 50,
		minWidth: 0,
		maxWidth: 100,
		isVisible: true,
	},
]);
</script>
