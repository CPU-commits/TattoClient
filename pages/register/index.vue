<script lang="ts" setup>
// NuxtAPP
const { $authService } = useNuxtApp()

// Form
const register = reactive({
	email: '',
	password: '',
	name: '',
	role: 'a',
})

function selectRole(role: 'a' | 'b' | 'c') {
	register.role = role
}
</script>

<template>
	<section class="Register">
		<div class="Register__content">
			<HTMLForm :action="() => $authService.register(register)">
				<h3>Registrarse</h3>

				<HTMLInput v-model:value="register.name" label-text="nombre" />
				<HTMLInput
					v-model:value="register.email"
					type="email"
					label-text="email"
				/>
				<HTMLInput
					v-model:value="register.password"
					type="password"
					label-text="contraseña"
				/>
				<!-- Select user type -->
				<div class="Roles">
					<button
						type="button"
						class="Role"
						:class="{ Selected: register.role === 'a' }"
						@click="() => selectRole('a')"
					>
						<i class="fa-solid fa-user"></i>
						<small>Cliente</small>
					</button>
					<button
						type="button"
						class="Role"
						:class="{ Selected: register.role === 'b' }"
						@click="() => selectRole('b')"
					>
						<i class="fa-solid fa-palette"></i>
						<small>Tatuador</small>
					</button>
					<button
						type="button"
						class="Role"
						:class="{ Selected: register.role === 'c' }"
						@click="() => selectRole('c')"
					>
						<i class="fa-solid fa-building-wheat"></i>
						<small>Dueño de estudio</small>
					</button>
				</div>
				<HTMLButton :with-background="true" type="submit"
					>Registrarse</HTMLButton
				>

				<footer class="Links">
					<HTMLLink href="/login"> Iniciar sesi&oacute;n </HTMLLink>
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

.Roles {
	display: flex;
	justify-content: space-evenly;
}

.Role {
	padding: 10px;
	border: none;
	border-radius: 4px;
	i,
	small {
		color: var(--color-dark);
	}
	display: flex;
	flex-direction: column;
	align-items: center;
}

.Selected {
	background-color: var(--color-main);
	i,
	small {
		color: white;
	}
}

.Links {
	display: flex;
	justify-content: center;
}
</style>
