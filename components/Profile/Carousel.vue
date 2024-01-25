<script lang="ts" setup>
// Types
import { UserTypesKeys } from '~/models/user/user.model'
// Props
const props = defineProps<{
	nickname: string
	tattos: Array<string>
	avatar?: string
}>()
// NuxtApp
const { $profileService, $fetchModule } = useNuxtApp()
// Stores
const authStore = useAuthStore()
const toastStore = useToastsStore()
// Form
const onClickInput = ref(() => {})
// Data
const avatarURL = ref(props.avatar)

function getTatto(index: number) {
	return props.tattos.at(index)
}

function changeProfileImg() {
	if (authStore.isOwnProfile) {
		onClickInput.value()
	}
}

async function uploadProfileImg(files: Array<File>) {
	try {
		const url = await $profileService.changeAvatar(files[0])
		avatarURL.value = url
	} catch (err) {
		toastStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}
</script>

<template>
	<section class="Carousel">
		<div
			v-for="tatto in 5"
			:key="tatto"
			class="Carousel__block"
			:class="{
				Main: tatto === 1,
				CornetTop: tatto === 3,
				CornetBottom: tatto === 5,
			}"
		>
			<NuxtImg
				:src="getTatto(tatto - 1) ?? '/img/alpaca.jpg'"
				alt="Tatuaje"
				:class="{
					Main: tatto === 1,
					CornetTop: tatto === 3,
					CornetBottom: tatto === 5,
				}"
			/>
			<NuxtLink
				v-if="tatto === 5"
				class="Carousel__gallery"
				:to="`${nickname}/gallery`"
			>
				<aside>
					<i class="fa-solid fa-images"></i>
				</aside>
			</NuxtLink>
		</div>

		<HTMLInvisibleButton class="AvatarButton" :click="changeProfileImg">
			<NuxtImg
				v-if="avatarURL"
				:src="avatarURL"
				class="Avatar"
				alt="Avatar"
				crossorigin="anonymous"
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
			<HTMLInvisibleInputFile
				accept="image/png, image/gif, image/jpeg"
				:filter="{
					type: 'image',
					message: 'Solo se aceptan imagenes',
				}"
				:on-change="uploadProfileImg"
				@on-click="(onClick) => (onClickInput = onClick)"
			/>
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

.Carousel__block {
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

.Carousel__gallery {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom-right-radius: 14px;
	i {
		font-size: 2.5rem;
	}
}

.AvatarButton {
	position: absolute;
	width: fit-content;
	width: 100px;
	height: 100px;
	bottom: -10px;
	left: -10px;
}

.Avatar {
	object-fit: cover;
	border-radius: 30%;
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
