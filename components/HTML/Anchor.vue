<script lang="ts" setup>
defineProps<{
	href: string
	primary?: boolean
}>()
</script>

<template>
	<NuxtLink class="Anchor" :class="{ Primary: primary }" :to="href">
		<slot />
	</NuxtLink>
</template>

<style scoped lang="scss">
.Anchor {
	padding: 8px;
	border-radius: 3px;
	background-color: transparent;
	text-decoration: none;
	display: flex;
	gap: 5px;
	color: var(--color-main);
	align-items: center;
	font-size: 0.9rem;
	justify-content: center;
	border: 1px solid var(--color-main);
	box-shadow: 0.1em 0.1em;
}

.Anchor:hover {
	transform: translate(-0.09em, -0.09em);
}

.Primary {
	color: white;
	border: none;
	background: linear-gradient(45deg, transparent 5%, var(--color-main) 5%);
}
</style>
