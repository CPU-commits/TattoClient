<script setup lang="ts">
// Types
withDefaults(
	defineProps<{
		orientation: 'L' | 'R' | 'D' | 'T'
	}>(),
	{
		orientation: 'D',
	},
)

const dropBool = ref(false)

function fn() {
	dropBool.value = !dropBool.value
}
</script>
<template>
	<div class="dropdown" @click="fn" :class="{ dropdown_up: dropBool }">
		<slot />
		<ul class="dropdown__content" :class="orientation">
			<slot name="content" />
			<DropDownItem content="Cancelar" class="DDI__color" />
		</ul>
	</div>
</template>

<style>
.DDI__color {
	color: var(--color-main);
}
.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown__content {
	display: none;
	position: absolute;
	list-style: none;
	background-color: var(--color-bg);
	min-width: 160px;
	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
	z-index: 99;
	& li:last-child {
		border-bottom: none;
	}
}

.dropdown_up .dropdown__content {
	display: block;
}
.D {
	top: 25px;
}
.L {
	right: 10px;
}
.T {
	bottom: 25px;
}
.R {
	left: 10px;
}
</style>
