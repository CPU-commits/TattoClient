<script lang="ts" setup>
defineProps<{
	content: string
	fn?: () => any
}>()
</script>
<template>
	<li @click="fn">{{ content }}</li>
</template>

<style scoped>
li {
	padding: 0.5rem;
	text-align: center;
	cursor: pointer;
	border-bottom: solid 1px;
}
li:active {
	background-color: rgba(0, 0, 0, 0.05);
}
</style>
