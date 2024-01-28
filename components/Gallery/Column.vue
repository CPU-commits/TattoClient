<script lang="ts" setup>
import type { Tattoo } from '~/models/tattoo/tattoo.model'

defineProps<{
	tattoos: Array<Tattoo>
}>()
</script>

<template>
	<section class="GalleryColumn">
		<article v-for="tattoo in tattoos" :key="tattoo._id.$oid">
			<NuxtImg
				:src="tattoo.image"
				crossorigin="anonymous"
				loading="lazy"
			/>
		</article>
	</section>
</template>

<style>
.GalleryColumn {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 15px;
	img {
		width: 100%;
		border-radius: 10px;
	}
}
</style>
