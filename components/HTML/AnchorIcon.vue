<script lang="ts" setup>
defineProps<{
	href: string
	classItem: string
}>()
</script>

<template>
	<NuxtLink class="Anchor" :to="href">
		<i :class="classItem" />
	</NuxtLink>
</template>

<style scoped lang="scss">
.Anchor {
	background-color: transparent;
	text-decoration: none;
	display: flex;
	gap: 5px;
	align-items: center;
	font-size: 0.9rem;
	justify-content: center;
	transition: all 0.4s ease;
}

.Anchor:hover i {
	color: var(--color-main);
}
</style>
