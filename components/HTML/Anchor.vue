<script lang="ts" setup>
defineProps<{
	href: string
	primary?: boolean
}>()
</script>

<template>
	<a class="Anchor" :class="{ Primary: primary }" :href="href">
		<slot />
	</a>
</template>

<style scoped lang="scss">
.Anchor {
	padding: 8px 20px;
	min-width: 200px;
	border-radius: 5px;
	background-color: #ededed;
	color: black;
	text-decoration: none;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
}

.Primary {
	color: white;
	background-color: black;
	transition: all 0.3s;
	animation: bg 10s infinite;
}

.Primary::after {
	pointer-events: none;
	content: '';
	position: absolute;
	top: 120%;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: var(--glow-spread-color);
	filter: blur(2em);
	opacity: 0.7;
	transform: perspective(1.5em) rotateX(35deg) scale(1, 0.6);
	transition: all 0.4s ease;
}

@keyframes bg {
	from {
		box-shadow: 0 0 4em -10px #00ace4;
	}

	25% {
		box-shadow: 0 0 4em -10px #bc13a4;
	}

	75% {
		box-shadow: 0 0 4em -10px #fc9638;
	}

	to {
		box-shadow: 0 0 4em -10px #00ace4;
	}
}
</style>
