<script lang="ts" setup>
function convertToTime(i: number) {
	if (i <= 12)
		if (i === 12) return i.toString() + ' PM'
		else return i.toString() + ' AM'
	else if (i === 24) return '12 AM'
	else return (i - 12).toString() + ' PM'
}
</script>

<template>
	<div class="CalendarPrimary">
		<VCalendar
			class="CalendarPrimary__calendar"
			expanded
			borderless
			transparent
			:min-date="new Date()"
			view="weekly"
		/>
		<div class="CalendarPrimary__hours">
			<i v-for="i in 24" :key="i">{{ convertToTime(i) }}</i>
		</div>
		<section class="CalendarPrimary__Columns">
			<div v-for="i in 7" :key="i" class="Column">
				<div v-for="j in 24" :key="j" class="Row"></div>
			</div>
		</section>
	</div>
</template>

<style lang="scss">
.CalendarPrimary {
	display: grid;
	grid-template-columns: 5ch 1fr;
	grid-template-rows: 120px 1fr;
	grid-template-areas:
		'space calendar'
		'hours events';
	gap: 10px;
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
