<script lang="ts" setup>
// Types
import type { Tattoo } from '@/models/tattoo/tattoo.model'
// NuxtApp
const { $tattooService } = useNuxtApp()
// Router
const route = useRoute()

const nickname = route.params.nickname as string
// Data
const tattoos = ref<Array<Tattoo> | null>(null)

const pairTattoos = computed(() => tattoos.value?.filter((_, i) => i % 2 === 0))
const impairTattoos = computed(
	() => tattoos.value?.filter((_, i) => i % 2 !== 0),
)
// Get gallery
async function getTattoos(page = 0, count = false) {
	const dataFetch = await $tattooService.getTattoosNickname(nickname, {
		page,
		count,
	})
	if (count) {
		tattoos.value = dataFetch.tattoos
		onScroll({
			countReturnedItems: 20,
			fx: getTattoos,
			total: dataFetch.max_tattoos,
		})
	} else {
		tattoos.value.push(...dataFetch.tattoos)
	}

	return true
}

onMounted(() => getTattoos(0, true))
</script>

<template>
	<section class="Gallery">
		<GalleryColumn :tattoos="pairTattoos" />
		<GalleryColumn :tattoos="impairTattoos" />
	</section>
</template>

<style>
.Gallery {
	display: flex;
	width: 100%;
	gap: 15px;
}
</style>
