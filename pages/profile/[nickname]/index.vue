<script lang="ts" setup>
// Types
import type { Profile } from '@/models/profile/profile.model'
import type { Category } from '~/models/tattoo/category.model'
import type { Tattoo } from '~/models/tattoo/tattoo.model'
// NuxtApp
const { $profileService, $categoryService, $tattooService } = useNuxtApp()
// Stores
const authStore = useAuthStore()
// Router
const route = useRoute()

const nickname = route.params.nickname as string
// Data
const profile = ref<Profile | null>(null)
const categories = ref<Array<Category>>(null)
const tattoos = ref<Array<Tattoo> | null>(null)

onBeforeMount(async () => {
	const dataFetch = await Promise.all([
		$profileService.getProfile(nickname),
		$categoryService.getCategories(),
		$tattooService.getLatestTattoosNickname(nickname),
	])
	profile.value = dataFetch[0]
	categories.value = dataFetch[1]
	tattoos.value = dataFetch[2]
})
</script>

<template>
	<NuxtLayout v-if="profile" name="profile">
		<ProfileCarousel
			:nickname="nickname"
			:tattoos="tattoos.map(({ image }) => image)"
			:avatar="profile.avatar"
		/>
		<ProfileCalendar />
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
		<ProfilePublisher
			v-if="authStore.isOwnProfile"
			:categories="categories"
		/>
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
</style>
