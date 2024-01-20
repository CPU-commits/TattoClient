<script lang="ts" setup>
// Stores
const authStore = useAuthStore()
</script>

<template>
	<header class="Header">
		<i class="fa-solid fa-mountain-sun"></i>
		<NuxtLink class="Header__title" to="/">
			<h1>AlpacaTatto</h1>
		</NuxtLink>

		<div class="Header__icons">
			<HTMLAnchorIcon
				href="Buscar"
				class-item="fa-solid fa-magnifying-glass"
			/>
			<HTMLAnchor
				v-if="!authStore.isAuth"
				:primary="true"
				href="/register"
			>
				Registrarse
			</HTMLAnchor>
			<HTMLAnchor
				v-else
				:primary="true"
				:href="`/profile/${authStore.getNickname}`"
			>
				Ir a perfil
			</HTMLAnchor>
		</div>
	</header>
</template>

<style scoped>
.Header {
	display: flex;
	width: 100%;
	padding: 10px;
	justify-content: space-between;
	font-size: 1.2rem;
	align-items: center;
	position: relative;
}

.Header__title {
	position: absolute;
	left: 0;
	right: 0;
	text-decoration: none;
	margin: 0 auto;
	width: fit-content;
}

.Header__icons {
	display: flex;
	gap: 10px;
}
</style>
