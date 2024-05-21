<script lang="ts" setup>
// Imports
import dayjs from 'dayjs'
// Types
import type { Calendar } from '@/models/calendar/calendar.model'
// NuxtApp
const { $calendarService } = useNuxtApp()

// Data
const calendar = ref<Calendar | null>(null)

onMounted(async () => {
	calendar.value = await $calendarService.getCalendar()
})

const hours = computed(() => calendar.value?.days.map((day) => day.block))
</script>

<template>
	<section class="CalendarSettings">
		<CalendarPanel v-if="calendar" :calendar="calendar" />
		<div class="CalendarPrimary">
			<VCalendar
				class="CalendarPrimary__calendar"
				expanded
				borderless
				transparent
				:min-date="dayjs().startOf('week').toDate()"
				view="weekly"
			/>
			<div class="CalendarPrimary__hours">
				<i v-for="i in hours" :key="i">{{ convertToTime(i) }}</i>
			</div>
			<section class="CalendarPrimary__Columns">
				<div v-for="i in 7" :key="i" class="Column">
					<div v-for="j in hours" :key="j" class="Row"></div>
				</div>
			</section>
		</div>
	</section>
</template>

<style lang="scss">
.CalendarSettings {
	display: flex;
}

.CalendarPrimary {
	display: grid;
	grid-template-columns: 5ch 1fr;
	grid-template-rows: 120px 1fr;
	grid-template-areas:
		'space calendar'
		'hours events';
	gap: 10px;
	width: 100%;
}

.CalendarPrimary__calendar {
	grid-area: calendar;
}

.CalendarPrimary__hours {
	grid-area: hours;
	width: fit-content;
	display: grid;
	grid-template-rows: repeat(24, 50px);
	text-align: center;
	i {
		width: 5ch;
		font-size: 0.7rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.CalendarPrimary__Columns {
	display: flex;
	justify-content: space-around;
	grid-area: events;
}

.CalendarPrimary__Columns .Column {
	width: 100%;
	display: grid;
	grid-template-rows: repeat(24, 50px);
	.Row {
		border-bottom: 1px dotted;
	}
}
</style>
