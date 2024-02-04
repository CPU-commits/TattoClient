<script lang="ts" setup>
import type { Post } from '~/models/post/post.model'

defineProps<{
	post: Post
}>()
</script>

<template>
	<article class="Post">
		<header class="Post__header">
			<NuxtImg src="/img/avatar.png" />
			<div class="Post__text">
				<small>{{ post.profile.user.name }}</small>
				<p>{{ post.content }}</p>
			</div>
		</header>
		<div v-if="post.images.length > 0" class="Post__img">
			<CarouselBasic :images="post.images" />
		</div>
		<footer class="Post__footer">
			<span><i class="fa-solid fa-heart"></i> {{ post.likes }}</span>
		</footer>
	</article>
</template>

<style scoped>
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
	display: flex;
	gap: 10px;
	img {
		width: 45px;
		height: 45px;
		object-fit: cover;
		border-radius: 100%;
	}
}

.Post__img {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
}

.Post__text {
	padding: 0.5rem 0;
	display: flex;
	flex-direction: column;

	min-height: 90px;
	& p {
		font-size: 0.9rem;
		margin-top: 4px;
		color: var(--color-black);
	}
	& small {
		color: var(--color-black);
	}
}

.Post__footer {
	span,
	i {
		font-size: 0.8rem;
	}
}
</style>
