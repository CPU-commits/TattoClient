<script lang="ts" setup>
// Types
import type { Category } from '~/models/tattoo/category.model'

// Categories
const { categories } = defineProps<{
	categories: Array<Category>
}>()
// NuxtApp
const { $tattooService, $fetchModule, $postService } = useNuxtApp()
// Stores
const toastsStore = useToastsStore()
// Modal
const modalTag = ref(false)
// Data
const tattoos = ref<Array<File>>([])
const post = ref('')
// Form
const categoriesData = ref<
	Array<{
		name: string
		slug: string
	}>
>([])
const filteredCategories = computed(() =>
	categories.filter(
		({ slug }) =>
			!categoriesData.value.some((category) => category.slug === slug),
	),
)
// Selected
const selected = ref(0)
// Funcs
const onClickFiles = ref(() => {})

async function uploadTattoos() {
	try {
		await $tattooService.uploadTattoos(
			tattoos.value,
			categoriesData.value.map(({ slug }) => slug),
		)
		// Clear
		categoriesData.value = []
		tattoos.value = []
		selected.value = 0

		toastsStore.addToast({
			message: 'Se han subido los tatuajes exitosamente',
			type: 'success',
		})
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}
async function uploadPost() {
	try {
		await $postService.uploadPost(post.value, tattoos.value)
		post.value = ''
		tattoos.value = []
		selected.value = 0

		emit('update:posts')
		toastsStore.addToast({
			message: 'Se ha subido el post con exito',
			type: 'success',
		})
	} catch (err) {
		toastsStore.addToast({
			message: $fetchModule.handleError(err).message,
			type: 'error',
		})
	}
}
const emit = defineEmits<{
	(e: 'update:posts'): void
}>()
</script>

<template>
	<section class="Publisher">
		<header class="Publisher__types">
			<button
				class="Publisher__types--type"
				:class="{ Selected: selected === 0 }"
				@click="() => (selected = 0)"
			>
				<i class="fa-solid fa-paper-plane"></i>
				<small> Publicaci&oacute;n</small>
			</button>
			<button
				class="Publisher__types--type"
				:class="{ Selected: selected === 1 }"
				@click="() => (selected = 1)"
			>
				<i class="fa-solid fa-camera-retro"></i>
				<small> Tatuajes</small>
			</button>
		</header>
		<!-- Publication -->
		<HTMLForm v-if="selected === 0" :action="uploadPost">
			<HTMLTextArea
				placeholder="¿Qué vamos a publicar?"
				:value="post"
				@update:value="(val) => (post = val)"
			/>
			<HTMLInputImages
				v-model:images="tattoos"
				:size="true"
				@on-click-files="(onClick) => (onClickFiles = onClick)"
			/>

			<footer class="Publisher__footer">
				<HTMLButton :with-background="true" type="submit">
					Publicar
				</HTMLButton>
				<HTMLButton type="button" :click="onClickFiles">
					<i class="fa-solid fa-file-circle-plus"></i>
					Añadir
				</HTMLButton>
			</footer>
		</HTMLForm>
		<!-- Tattoo -->
		<HTMLForm v-if="selected === 1" :action="uploadTattoos">
			<HTMLInputImages
				v-model:images="tattoos"
				@on-click-files="(onClick) => (onClickFiles = onClick)"
			/>
			<div class="Publisher__tags">
				<i class="fa-solid fa-tags"></i>
				<HTMLInvisibleButton :click="() => (modalTag = true)">
					<i class="fa-solid fa-plus"></i>
				</HTMLInvisibleButton>
				<small v-if="categoriesData.length === 0">
					<i>No hay etiquetas...</i>
				</small>
				<small
					v-for="(category, i) in categoriesData"
					v-else
					:key="i"
					class="Publisher__tags--tag"
				>
					<HTMLInvisibleButton
						:click="
							() => {
								categoriesData.splice(i, 1)
							}
						"
					>
						<i class="fa-solid fa-minus"></i>
					</HTMLInvisibleButton>
					{{ category.name }}
				</small>
			</div>
			<footer class="Publisher__footer">
				<HTMLButton :with-background="true" type="submit">
					Subir tatuajes
				</HTMLButton>
				<HTMLButton type="button" :click="onClickFiles">
					<i class="fa-solid fa-file-circle-plus"></i>
					Añadir
				</HTMLButton>
			</footer>
		</HTMLForm>
		<!-- Modal -->
		<Modal v-model:opened="modalTag">
			<template #title>
				<h2>Etiquetas</h2>
			</template>
			<div class="Categories">
				<HTMLInvisibleButton
					v-for="category in filteredCategories"
					:key="category._id.$oid"
					:click="
						() => {
							categoriesData.push(category)
						}
					"
				>
					<i class="fa-solid fa-circle-plus"></i>
					{{ category.name }}
				</HTMLInvisibleButton>
			</div>
		</Modal>
	</section>
</template>

<style scoped lang="scss">
.Publisher {
	width: 100%;
}

.Publisher__types {
	display: flex;
	gap: 10px;
}

.Publisher__types--type {
	padding: 5px 8px;
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
	border: none;
	background-color: transparent;
	small,
	i {
		font-size: 0.8rem;
	}
}

.Publisher__tags {
	display: flex;
	gap: 15px;
	align-items: center;
	.fa-solid {
		color: var(--color-main);
	}
	button {
		background-color: var(--color-black);
		border-radius: 60%;
		width: 16px;
		height: 16px;
		.fa-solid {
			color: white;
			font-size: 0.8rem;
		}
	}
}

.Publisher__tags--tag {
	background-color: var(--color-main);
	color: white;
	border-radius: 5px;
	padding: 2px 5px;
	button {
		background-color: transparent;
	}
}

.Categories {
	display: flex;
	gap: 20px;
	button {
		background-color: var(--color-main);
		i {
			color: white;
		}
		color: white;
		padding: 8px;
		border-radius: 5px;
		font-size: 1rem;
	}
}

.Publisher__footer {
	display: flex;
	gap: 10px;
	align-items: center;
	i {
		font-size: 1rem;
	}
	span {
		cursor: pointer;
	}
}

.Selected {
	background-color: var(--color-main);
	small,
	i {
		color: white;
	}
}
</style>
