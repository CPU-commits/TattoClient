<script lang="ts" setup>
// Types
import { UserTypesKeys } from '~/models/user/user.model'
// Props
const props = defineProps<{
	tattos: Array<string>
	avatar?: string
}>()
// Stores
const authStore = useAuthStore()

function getTatto(index: number) {
	return props.tattos.at(index)
}

function changeProfileImg() {
	if (authStore.isOwnProfile) {
		console.log('We need to change')
	}
}
</script>

<template>
	<section class="Carousel">
		<NuxtImg
			v-for="tatto in 5"
			:key="tatto"
			:src="getTatto(tatto - 1) ?? '/img/alpaca.jpg'"
			alt="Tatuaje"
			:class="{
				Main: tatto === 1,
				CornetTop: tatto === 3,
				CornetBottom: tatto === 5,
			}"
		/>
		<HTMLInvisibleButton class="AvatarButton" :click="changeProfileImg">
			<NuxtImg
				v-if="avatar"
				:src="avatar"
				class="Avatar"
				alt="Avatar"
				@error="$event.target.src = '/img/avatar.png'"
			/>
			<NuxtImg v-else class="Avatar" src="/img/avatar.png" alt="Avatar" />
			<aside
				v-if="
					authStore.userTypeIs(UserTypesKeys.TATTO) &&
					authStore.isOwnProfile
				"
				class="AvatarUser"
			>
				<i class="fa-solid fa-file-arrow-up"></i>
			</aside>
		</HTMLInvisibleButton>
	</section>
</template>

<style scoped lang="scss">
.Carousel {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	grid-template-areas:
		'Main Main . .'
		'Main Main . .';
	gap: 10px;
	position: relative;
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.Main {
	grid-area: Main;
	border-top-left-radius: 14px;
	border-bottom-left-radius: 14px;
}

.CornetTop {
	border-top-right-radius: 14px;
}

.CornetBottom {
	border-bottom-right-radius: 14px;
}

.AvatarButton {
	position: absolute;
	width: fit-content;
	width: 80px;
	height: 80px;
	bottom: -10px;
	left: -10px;
}

.Avatar {
	object-fit: cover;
}

.AvatarUser {
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 80%;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.4s;
	visibility: hidden;
	i {
		font-size: 1.5rem;
		color: white;
	}
}

.AvatarButton:hover .AvatarUser {
	visibility: visible;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
