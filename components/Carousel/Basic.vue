<script setup lang="ts">
defineProps<{
	images: Array<string>
}>()
</script>

<template>
	<NuxtImg
		v-if="images.length === 1"
		class="carousel__item"
		fit="fill"
		crossorigin="anonymous"
		:src="images[0]"
	/>
	<Carousel v-else>
		<Slide v-for="(img, index) in images" :key="index"
			><NuxtImg
				class="carousel__item"
				fit="fill"
				crossorigin="anonymous"
				:src="img"
			/>
		</Slide>

		<template #addons>
			<Navigation />
			<Pagination />
		</template>
	</Carousel>
</template>

<style>
.carousel__item {
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 60%;
}

.carousel__slide {
	display: flex;
	justify-content: center;
	align-items: center;
}
.carousel__prev,
.carousel__next {
	box-sizing: content-box;
}

.carousel__next--disabled,
.carousel__prev--disabled {
	cursor: none;
	opacity: 0;
}

.carousel__icon:hover {
	fill: var(--color-black);
}

.carousel__pagination-button::after {
	border-radius: 50%;
	width: 8px;
	height: 8px;
}
</style>
