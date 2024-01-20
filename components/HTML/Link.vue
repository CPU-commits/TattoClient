<script lang="ts" setup>
defineProps<{
	href: string
}>()
</script>

<template>
	<NuxtLink :to="href">
		<slot />
	</NuxtLink>
</template>

<style scoped>
a {
	border-bottom: 1px solid var(--color-main);
	font-size: 0.9rem;
	text-decoration: none;
	color: var(--color-main);
}
</style>
