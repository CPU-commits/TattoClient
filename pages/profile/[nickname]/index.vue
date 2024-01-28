<script setup lang="ts">
import type { Profile } from '@/models/profile/profile.model'

const { $profileService, $postService } = useNuxtApp()
const route = useRoute()

const nickname = route.params.nickname as string
const profile = ref<Profile | null>(null)
const posts = ref([])

async function getPost(total = false, page?: number, item?: number) {
	try {
		if (!total) {
			const data = await $postService.getPost(nickname, page, item)

			posts.value.push(...data.posts)
			return data
		} else {
			const data = await $postService.getPost(nickname, page, item)
			return data
		}
	} catch (e) {
		console.log(e)
	}
}

onBeforeMount(async () => {
	profile.value = await $profileService.getProfile(nickname)
	const data = await getPost(true)
	const count = 10
	await getPost(false, 1, count)

	onScroll({
		countReturnedItems: count,
		total: data.posts.length || 0,
		fx: async (page) => {
			page += 1
			const data = await getPost(false, page, count)
			if (data) return true
			else return false
		},
	})
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
		<section class="Profile__inventory">a</section>
		<section v-if="posts.length > 0" class="Profile__posts">
			<ProfilePost
				v-for="(item, index) in posts"
				:content="item.content"
				:user="profile.nickname"
				:likes="item.likes"
				:key="index"
			/>
		</section>
		<p v-else>No hay publicaciones.</p>
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
.Profile__posts {
	position: relative;
	width: 100%;
	display: flex;
	gap: 2rem;
	padding: 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
