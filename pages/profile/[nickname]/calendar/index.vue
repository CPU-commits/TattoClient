<template>
	<section class="CalendarPage">
		<!--
		<VCalendar
			class="Calendar__calendar"
			show-weeknumbers
			borderless
			transparent
			:min-date="new Date()"
			color="red"
		/>
		-->
		<CalendarPrimary />
	</section>
</template>

<style lang="scss">
.CalendarPage {
	width: 100%;
}

.Calendar__calendar {
	.vc-day-content,
	.vc-title span {
		color: var(--color-black);
	}
	.vc-disabled {
		color: var(--color-dark);
	}
	button:not(:disabled) svg {
		stroke: var(--color-black);
	}
	button {
		background-color: transparent;
	}
}
</style>
