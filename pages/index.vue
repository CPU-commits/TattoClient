<template>
	<section class="Main">
		<section class="Title">
			<header>
				<MainTitle />

				<p>
					<strong>Comunidad</strong> de tatuajes en Chile. Busca el
					tatuaje que mejor se adapte a tu piel o lana...
				</p>
			</header>
			<nav>
				<HTMLAnchor href="/tatuadores"> Tatuadores </HTMLAnchor>
				<HTMLAnchor href="/tatuadores" :primary="true">
					Ir a buscar
				</HTMLAnchor>
			</nav>
		</section>
	</section>
</template>

<style scoped lang="scss">
.Main {
	margin-top: 30px;
	display: flex;
	flex-direction: column;
}

.Title {
	display: flex;
	flex-direction: column;
	align-items: center;
	header {
		display: flex;
		align-items: center;
		gap: 30px;
	}
	gap: 20px;
	nav {
		display: flex;
		gap: 30px;
	}
	p {
		color: var(--color-dark);
		max-width: 300px;
		text-align: center;
	}
	path {
		color: black;
	}
	strong {
		color: var(--color-main);
	}
}
</style>
