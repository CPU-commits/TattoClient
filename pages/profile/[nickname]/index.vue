<script setup lang="ts">
import type { Profile } from '@/models/profile/profile.model'
import type { Category } from '~/models/tattoo/category.model'
import type { Tattoo } from '~/models/tattoo/tattoo.model'
import type { Post } from '~/models/post/post.model'
// NuxtApp
const { $profileService, $categoryService, $tattooService, $postService } =
	useNuxtApp()
// Stores
const authStore = useAuthStore()

// Router
const route = useRoute()

const nickname = route.params.nickname as string
// Data
const profile = ref<Profile | null>(null)
const categories = ref<Array<Category>>(null)
const tattoos = ref<Array<Tattoo> | null>(null)
const posts = ref<Array<Post> | null>(null)
// User
onMounted(async () => {
	const dataFetch = await Promise.all([
		$profileService.getProfile(nickname),
		$categoryService.getCategories(),
		$tattooService.getLatestTattoosNickname(nickname),
		getPost(true, 1),
	])

	profile.value = dataFetch[0]
	categories.value = dataFetch[1]
	tattoos.value = dataFetch[2]

	// Set onscroll
	onScroll({
		countReturnedItems: 10,
		total: dataFetch[3].total,
		fx: async (page) => (await getPost(false, page + 1)).success,
	})
})

async function getOnePost(value: string) {
	const data = await $postService.getPost(value)
	const post = posts.value.find((p) => p._id.$oid === data.post._id.$oid)

	if (post) {
		post.likes = data.post.likes
		post.is_visible = data.post.is_visible
	}
}
async function getPost(count = false, page?: number) {
	if (count) {
		const dataFetch = await $postService.getPosts(nickname, {
			page,
			count,
		})

		posts.value = dataFetch.posts
		return {
			total: dataFetch.count,
			success: true,
		}
	} else {
		const { posts: postsData } = await $postService.getPosts(nickname, {
			page,
			count,
		})
		posts.value?.push(...postsData)
	}
	return {
		success: true,
	}
}
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
		<section v-if="posts" class="Profile__posts">
			<ProfilePost
				v-for="(post, index) in posts"
				:key="index"
				:post="post"
				@update:value="getOnePost"
				@update:posts="getPost(true, 1)"
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
