<script lang="ts" setup>
// NuxtAPP
const { $authService } = useNuxtApp()

// Form
const login = reactive({
	email: '',
	password: '',
})
</script>

<template>
	<section class="Register">
		<div class="Register__content">
			<HTMLForm :action="() => $authService.login(login)">
				<h3>Iniciar sesi&oacute;n</h3>

				<HTMLInput
					v-model:value="login.email"
					type="email"
					label-text="email"
				/>
				<HTMLInput
					v-model:value="login.password"
					type="password"
					label-text="contraseña"
				/>
				<HTMLButton :with-background="true" type="submit"
					>Iniciar sesi&oacute;n</HTMLButton
				>

				<footer class="Links">
					<HTMLLink href="/register"> Registrarse </HTMLLink>
				</footer>
			</HTMLForm>
		</div>
	</section>
</template>

<style scoped lang="scss">
.Register {
	display: flex;
	justify-content: center;
}

img {
	max-width: 500px;
	filter: grayscale(1);
}

.Register__content {
	width: 400px;
	padding: 15px;
	height: fit-content;
	border: 2px solid var(--color-main);
}

.Links {
	display: flex;
	justify-content: center;
}
</style>
