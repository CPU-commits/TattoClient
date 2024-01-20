<script lang="ts" setup>
// Types
import type { Profile } from '@/models/profile/profile.model'
// NuxtApp
const { $profileService } = useNuxtApp()
// Router
const route = useRoute()

const nickname = route.params.nickname as string
// Data
const profile = ref<Profile | null>(null)

onBeforeMount(async () => {
	profile.value = await $profileService.getProfile(nickname)
})
</script>

<template>
	<NuxtLayout v-if="profile" name="profile">
		<ProfileCarousel :tattos="[]" />
		<header class="Profile__header">
			<div class="Profile__header--user">
				<article class="Profile__header--specs">
					<div class="Spec">
						<span>0</span>
						<h3>Seguidores</h3>
					</div>
				</article>
			</div>
			<div class="Profile__header--text">
				<p v-if="profile.description">{{ profile.description }}</p>
				<p v-else>No hay descripci&oacute;n</p>
				<small>@{{ profile.nickname }}</small>
			</div>
		</header>
		<section class="Profile__inventory"></section>
		<section class="Profile__posts"></section>
	</NuxtLayout>
</template>

<style scoped lang="scss">
.Profile__header {
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	max-width: 600px;
}

.Profile__header--user {
	display: flex;
}

.Profile__header--specs {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	h3 {
		font-size: 0.9rem;
	}
	.Spec {
		display: flex;
		flex-direction: column;
		align-items: center;
		span {
			color: var(--color-black);
			font-size: 0.85rem;
		}
	}
}

.Profile__header--text {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	p {
		color: var(--color-black);
		font-size: 0.8rem;
	}
}

.Profile__inventory {
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
}
</style>
