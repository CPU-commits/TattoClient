<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
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
const draggable = ref(false)
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

const toggleDD = () => {
	if (draggable.value === true) {
		getPost(true, 1)
		draggable.value = false
	} else {
		draggable.value = !draggable.value
	}
}
const cancelDD = () => {
	getPost(true, 1)
	draggable.value = false
}
async function acceptDD() {
	try {
		await $postService.updatePositionPost(nickname, posts.value)
		draggable.value = false
	} catch (e) {
		console.log(e)
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
			@update:posts="getPost(true, 1)"
		/>
		<span class="Profile__config-post"
			><i class="fa-solid fa-sliders" @click="toggleDD"></i>
			<div v-if="draggable">
				<i class="fa-solid fa-check" @click="acceptDD"></i
				><i class="fa-solid fa-xmark" @click="cancelDD"></i></div
		></span>

		<section
			v-if="posts"
			class="Profile__posts"
			:class="{ Draggable_on: draggable }"
		>
			<VueDraggableNext
				v-if="draggable"
				v-model="posts"
				class="VueDraggableNext"
			>
				<ProfilePost
					v-for="(post, index) in posts"
					:key="index"
					:post="post"
					:dragg="draggable"
					@update:value="getOnePost"
					@update:posts="getPost(true, 1)"
				/>
			</VueDraggableNext>
			<ProfilePost
				v-for="(post, index) in posts"
				v-else
				:key="index"
				:post="post"
				:dragg="draggable"
				@update:value="getOnePost"
				@update:posts="getPost(true, 1)"
			/>
		</section>
		<p v-else>No hay publicaciones.</p>
	</NuxtLayout>
</template>

<style scoped lang="scss">
.Profile__config-post {
	display: flex;
	gap: 1rem;
	& i {
		cursor: pointer;
	}
	& i:hover {
		color: var(--color-main);
	}
	div {
		display: flex;
		gap: 0.4rem;
	}
}
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
	gap: 2rem;
	display: flex;
	padding: 1rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& .VueDraggableNext {
		display: inherit;
		flex-direction: column;
		gap: 2rem;
		cursor: grab;
	}
}

.Draggable_on {
	border-radius: 14px;
	width: 70%;
	box-shadow: inset 0 0 0 1px var(--color-black);
}
</style>
