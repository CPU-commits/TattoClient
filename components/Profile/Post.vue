<script lang="ts" setup>
const props = defineProps<{
	content: string
	user: string
	likes: number
}>()
</script>

<template>
	<article class="Post">
		<div class="Post__img">
			<NuxtImg
				fit="fill"
				sizes="100vw sm:50vw md:400px"
				src="/img/alpaca.jpg"
			/>
			<IconHeart class="Icon" />
		</div>
		<div class="Post__text">
			<small>@{{ props.user }}</small>
			<span>{{ props.likes }} Me gusta</span>

			<p>{{ props.content }}</p>
		</div>
		<div class="Post__icon"></div>
	</article>
</template>

<style scoped>
.Post {
	box-sizing: border-box;
	min-height: 400px;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--color-main);
}
small {
	padding: 1rem 0;
}
.Post__img {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid var(--color-opacity);
	& .Icon {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1001;
		cursor: pointer;
	}
}
.Post__text {
	padding: 0.5rem 0;
	display: flex;
	flex-direction: column;
	& p {
		margin-top: 4px;
		color: var(--color-black);
	}
	& small {
		padding: 0.5rem 0;
	}
}
</style>
