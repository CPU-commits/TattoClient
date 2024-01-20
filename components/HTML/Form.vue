<script lang="ts" setup>
defineProps<{
	action: () => any
}>()
</script>

<template>
	<form @submit.prevent="action">
		<slot />
	</form>
</template>

<style scoped>
form {
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
}
</style>
