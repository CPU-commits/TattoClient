<script lang="ts" setup>
// Types
import type { Calendar } from '~/models/calendar/calendar.model'
// Props
defineProps<{
	calendar: Calendar
}>()
// NuxtApp
const { $calendarService } = useNuxtApp()

// Modal
const modalNew = ref(false)
// Form
const block = reactive({
	day: '',
	block_from: '',
	block_to: '',
})

async function addBlock() {
	await $calendarService.addCalendarBlock(block)
}
</script>

<template>
	<section class="Panel">
		<div class="Panel__week">
			<h3>
				<i class="fa-solid fa-calendar-week"></i> Citas disponibles de
				la semana
			</h3>
			<HTMLInvisibleButton :click="() => (modalNew = true)">
				<i class="fa-solid fa-circle-plus"></i>
			</HTMLInvisibleButton>
		</div>
		<div class="Panel__control">
			<h3><i class="fa-solid fa-gears"></i> Configuraciones</h3>
			<ul>
				<li>
					<select
						v-model="calendar.settings.days_advance"
						class="Select"
					>
						<option v-for="i in 30" :key="i" :value="i">
							{{ i }}
						</option>
					</select>
					Anticipaci&oacute;n para agendar (D&iacute;as)
				</li>
			</ul>
		</div>
		<div class="Panel__exceptions">
			<h3><i class="fa-solid fa-calendar-xmark"></i> Excepciones</h3>
		</div>
		<!-- Modals -->
		<Modal v-model:opened="modalNew">
			<template #title>
				<h2>Agregar bloque de cita al calendario</h2>
			</template>
			<HTMLForm :action="addBlock">
				<label for="day">D&iacute;a</label>
				<HTMLSelect id="day" v-model:value="block.day">
					<option value="">Seleccione un d&iacute;a</option>
					<option value="M">Lunes</option>
					<option value="T">Martes</option>
					<option value="W">Mi&eacute;rcoles</option>
					<option value="X">Jueves</option>
					<option value="F">Viernes</option>
					<option value="S">S&aacute;bado</option>
					<option value="SU">Domingo</option>
				</HTMLSelect>
				<label for="block">Bloque de horario (Desde)</label>
				<HTMLInput v-model:value="block.block_from" type="time" />
				<label for="block">Bloque de horario (Hasta)</label>
				<HTMLInput v-model:value="block.block_to" type="time" />
				<HTMLButton type="button" :with-background="true">
					Añadir bloque de cita
				</HTMLButton>
			</HTMLForm>
		</Modal>
	</section>
</template>

<style scoped lang="scss">
.Panel {
	font-size: 0.7rem;
	padding: 10px;
	width: fit-content;
	min-width: 180px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	h3,
	i {
		font-size: 0.8rem;
		color: var(--color-dark);
	}
	button {
		width: 100%;
		i {
			color: var(--color-black);
		}
	}
}

ul {
	padding: 5px 0;
}

.Select {
	font-size: 0.7rem;
	border: none;
	background-color: transparent;
}

.Select:focus {
	outline: none;
}
</style>
