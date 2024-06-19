<script lang="ts" setup>
import type { Post } from '~/models/post/post.model'
import type { OID } from '~/models/body.model'
import type { Like } from '~/models/like/like.model'
const params = defineProps<{
	post: Post
	dragg: boolean
}>()
const authStore = useAuthStore()
const toastsStore = useToastsStore()

const { $postService, $fetchModule, $likeService } = useNuxtApp()
const isLiked = ref(false)
const likes = ref<Array<Like>>(null)
const editPostContent = ref(false)
const disguisePost = ref(false)
const deletePost = ref(false)
const opened = ref(false)

function comparation(postId: OID, likesPost: Array<Like>) {
	if (
		likesPost.length > 0 &&
		likesPost.some((like) => like.post.$oid === postId.$oid)
	) {
		isLiked.value = true
	} else {
		isLiked.value = false
	}
}
onMounted(async () => {
	try {
		if (authStore.getIsAuth) {
			likes.value = await $likeService.getLike()
			comparation(params.post._id, likes.value)
		}
	} catch (e) {
		console.error(e)
	}
})

async function likePost() {
	try {
		await $postService.likePost(params.post._id.$oid)
		emit('update:value', params.post._id.$oid)
		likes.value = await $likeService.getLike()
		comparation(params.post._id, likes.value)
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}

async function confirmEditContent() {
	try {
		if (params.post.content.length > 0) {
			await $postService.updatePost(params.post._id.$oid, {
				content: params.post.content,
			})
			editPostContent.value = false
		} else {
			toastsStore.addToast({
				message: 'Escribir minimo 1 palabra',
				type: 'error',
			})
		}
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}
async function confirmDisguisePost() {
	try {
		await $postService.updatePost(params.post._id.$oid, {
			is_visible: params.post.is_visible,
		})
		disguisePost.value = false
		opened.value = false
		emit('update:value', params.post._id.$oid)
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}
async function confirmDeletePost() {
	try {
		await $postService.deletePost(params.post._id.$oid)
		emit('update:posts')
		deletePost.value = false
		opened.value = false
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}

const emit = defineEmits<{
	(e: 'update:value', value: string): void
	(e: 'update:posts'): void
}>()

// Toggles functions
function toggleEditContent() {
	editPostContent.value = !editPostContent.value
}
function toggleModal() {
	opened.value = !opened.value
	disguisePost.value = false
	deletePost.value = false
}
function toggleDisguisePost() {
	disguisePost.value = !disguisePost.value
	opened.value = !opened.value
}

function toggleDeletePost() {
	deletePost.value = !deletePost.value
	opened.value = !opened.value
}
</script>

<template>
	<article
		v-if="post.is_visible || authStore.isOwnProfile"
		class="Post"
		:class="{ draggeable_on: dragg }"
	>
		<header class="Post__header">
			<NuxtImg src="/img/avatar.png" />
			<div class="Post__text">
				<div>
					<small>{{ post.profile.user.name }}</small>
					<span v-if="!post.is_visible" class="is_visible"
						><i class="fa-solid fa-eye-slash"></i>
					</span>
					<small v-if="editPostContent" class="check__edit">
						<button type="button" @click="confirmEditContent">
							<i class="fa-solid fa-check"> </i>
						</button>
					</small>
					<DropDownBox v-if="authStore.isOwnProfile" orientation="L">
						<span>
							<i class="fa-solid fa-ellipsis-vertical"></i
						></span>
						<template #content>
							<DropDownItem
								:fn="toggleEditContent"
								content="Editar"
							/>
							<DropDownItem
								:fn="toggleDisguisePost"
								content="Ocultar"
							/>
							<DropDownItem
								:fn="toggleDeletePost"
								content="Borrar"
							/>
						</template>
					</DropDownBox>
				</div>
				<p v-if="!editPostContent">{{ post.content }}</p>
				<HTMLTextArea v-else v-model:value="post.content" />
			</div>
		</header>
		<div v-if="post.images?.length > 0" class="Post__img">
			<CarouselBasic :images="post.images" />
		</div>
		<footer class="Post__footer">
			<span
				><i
					class="fa-solid fa-heart"
					:class="{ isLiked: isLiked }"
					@click="likePost"
				></i>
				{{ post.likes }}</span
			>
		</footer>
		<Modal :opened="opened" :fn="toggleModal">
			<template #title>
				<div v-if="disguisePost">
					<h1 v-if="post.is_visible">Ocultar publicación</h1>
					<h1 v-else-if="!post.is_visible">Mostrar publicación</h1>
				</div>
				<div v-if="deletePost">
					<h1>Eliminar publicación</h1>
				</div>
			</template>
			<p v-if="deletePost">¿Estas seguro de eliminar esta publicación?</p>
			<div class="confirm__button">
				<HTMLButton
					v-if="disguisePost"
					type="button"
					@click="confirmDisguisePost"
					>Confirmar</HTMLButton
				>
				<HTMLButton
					v-if="deletePost"
					type="button"
					@click="confirmDeletePost"
					>Confirmar</HTMLButton
				>
			</div>
		</Modal>
	</article>
</template>

<style scoped>
.draggeable_on:active {
	cursor: grabbing;
	opacity: 0.4;
}
i {
	cursor: pointer;
}
.confirm__button {
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 1rem 0 0 0;
}
.is_visible {
	display: flex;
	align-items: center;
	width: 100%;
	text-align: start;
	padding: 0 0.5rem;
	font-size: 0.7rem;
	i {
		cursor: default;
	}
}
.check__edit {
	display: flex;
	width: 100%;
	gap: 0.5rem;
	justify-content: end;
	padding: 0 1.2rem;
	button {
		background-color: transparent;
		border: none;
	}
}
.isLiked {
	color: red;
}

.Post {
	box-sizing: border-box;
	max-width: 500px;
	display: flex;
	width: 100%;
	flex-direction: column;
	padding-bottom: 10px;
	border-bottom: 1px solid var(--color-dark);
}

.Post__header {
	position: relative;
	display: flex;
	gap: 8px;
	img {
		width: 40px;
		height: 50px;
		object-fit: cover;
		border-radius: 100%;
	}
}

.Post__img {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 310px;
}

.Post__text {
	padding: 0.5rem 0;
	display: flex;
	flex-direction: column;
	min-height: 90px;
	width: 100%;
	p,
	textarea {
		font-size: 0.9rem;
		padding: 0.4rem 0;
		color: var(--color-black);
		text-wrap: wrap;
	}
	textarea {
		width: 95%;
		height: 100%;
		resize: none;
	}

	small {
		color: var(--color-black);
	}
	div {
		display: inherit;
		justify-content: space-between;
	}
}

.Post__footer {
	span,
	i {
		font-size: 0.8rem;
	}
	i:hover {
		opacity: 0.8;
	}
}
</style>
