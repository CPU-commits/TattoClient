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
// Get gallery
onMounted(async () => {
	tattoos.value = await $tattooService.getTattoosNickname(nickname)
})
</script>

<template>
	<section class="Gallery"></section>
</template>
