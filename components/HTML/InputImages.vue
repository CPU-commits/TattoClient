<script lang="ts" setup>
// Form
const onClickFiles = ref(() => {})
// Data
const images = ref<Array<string>>([])
// Styles
const onSide = ref(false)

// Emits
const emit = defineEmits<{
	(e: 'onClickFiles', v: () => void): void
}>()

watch(onClickFiles, (newOnClickFiles) => {
	emit('onClickFiles', newOnClickFiles)
})

function handleFiles(files: Array<File>) {
	files.forEach(addImage)
}

function addDroppedFiles(e: DragEvent) {
	onSide.value = false
	e.preventDefault()
	// Process
	if (e.dataTransfer.items) {
		;[...e.dataTransfer.items].forEach((item) => {
			if (item.kind === 'file') {
				const file = item.getAsFile()
				if (file.type.includes('image')) addImage(file)
			}
		})
	}
}

function addImage(file: File) {
	// Base64
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => {
		// Image
		images.value.push(reader.result as string)
	}
}

function deleteFile(index: number) {
	images.value.splice(index, 1)
}
</script>

<template>
	<div class="InputImages">
		<!-- Drag and drop -->
		<div
			class="InputImages__drag-drop"
			:class="{ On: onSide }"
			@drop="(e) => addDroppedFiles(e)"
			@dragover="
				(e) => {
					e.preventDefault()
					onSide = true
				}
			"
			@dragleave="() => (onSide = false)"
		>
			<i v-if="images.length === 0" class="fa-solid fa-braille"></i>
			<div v-for="(img, i) in images" v-else :key="i" class="Image">
				<NuxtImg :src="img" />
				<HTMLInvisibleButton :click="() => deleteFile(i)">
					<i class="fa-solid fa-xmark"></i>
				</HTMLInvisibleButton>
			</div>
		</div>

		<HTMLInvisibleInputFile
			accept="image/png, image/gif, image/jpeg"
			:multiple="true"
			:filter="{
				type: 'image',
				message: 'Solo se aceptan imagenes',
			}"
			:on-change="handleFiles"
			@on-click="(onClick) => (onClickFiles = onClick)"
		/>
	</div>
</template>

<style scoped>
.InputImages__drag-drop {
	border: 3px dotted;
	display: flex;
	justify-content: center;
	padding: 8px;
	min-height: 150px;
	align-items: center;
	flex-wrap: wrap;
	gap: 50px;
}

i {
	font-size: 2rem;
}

img {
	width: 150px;
	height: 150px;
	object-fit: cover;
	border-radius: 8px;
}

.On {
	border: 3px dotted var(--color-main);
}

.Image {
	position: relative;
	button {
		position: absolute;
		top: -5px;
		right: -5px;
		background-color: var(--color-black);
		border-radius: 60%;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		i {
			font-size: 1rem;
			color: white;
		}
	}
}
</style>
