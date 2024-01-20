<script lang="ts" setup>
// eslint-disable-next-line vue/no-setup-props-destructure
const { images } = defineProps<{
	images?: Array<string>
	icon?: string
}>()

const defaultImage = '/img/alpaca.jpg'
const imagesInCards = computed(() => images ?? new Array(3).fill(defaultImage))
</script>

<template>
	<div class="Cards">
		<NuxtImg
			v-for="(image, i) in imagesInCards"
			:key="i"
			:class="{
				Behind: i !== 0,
				'Behind-first': i === 1,
				'Behind-second': i === 2,
			}"
			:src="image"
		/>
		<aside v-if="icon" class="Cards__icon">
			<i :class="icon" />
		</aside>
	</div>
</template>

<style scoped>
.Cards {
	position: relative;
	img {
		width: 200px;
		height: 220px;
		object-fit: cover;
		border-radius: 5px;
	}
	.Behind {
		position: absolute;
		left: 0;
		z-index: -1;
		transition: 0.2s ease;
		overflow: hidden;
	}
	&:hover .Behind-first {
		transform: translateX(100px) rotate(15deg);
	}
	&:hover .Behind-second {
		transform: translateX(50px) rotate(15deg);
	}
}

.Cards__icon {
	background-color: var(--color-main);
	position: absolute;
	right: -8px;
	bottom: -8px;
	border-radius: 60%;
	width: 30px;
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	i {
		color: white;
	}
}
</style>
