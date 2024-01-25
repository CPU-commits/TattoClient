<script lang="ts" setup>
// Form
const categories = ref<Array<string>>([])
// Selected
const selected = ref(0)
// Funcs
const onClickFiles = ref(() => {})
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
		<HTMLForm v-if="selected === 0" :action="() => {}">
			<HTMLTextArea placeholder="¿Qué vamos a publicar?" value="" />
			<footer class="Publisher__footer">
				<HTMLButton :with-background="true" type="submit">
					Publicar
				</HTMLButton>
			</footer>
		</HTMLForm>
		<!-- Tattoo -->
		<HTMLForm v-if="selected === 1" :action="() => {}">
			<HTMLInputImages
				@on-click-files="(onClick) => (onClickFiles = onClick)"
			/>
			<div class="Publisher__tags">
				<i class="fa-solid fa-tags"></i>
				<HTMLInvisibleButton :click="() => {}">
					<i class="fa-solid fa-plus"></i>
				</HTMLInvisibleButton>
				<small v-if="categories.length === 0">
					<i>No hay etiquetas...</i>
				</small>
				<small v-for="(category, i) in categories" v-else :key="i">
					{{ category }}
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
	.fa-solid {
		color: var(--color-main);
	}
	button {
		background-color: var(--color-black);
		border-radius: 60%;
		width: 16px;
		height: 16px;
		i {
			color: white !important;
			font-size: 0.8rem;
		}
	}
}

.Publisher__footer {
	display: flex;
	gap: 10px;
	i {
		font-size: 1rem;
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
