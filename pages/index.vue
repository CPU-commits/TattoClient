<template>
	<section class="Main">
		<section class="Title">
			<header>
				<MainTitle />

				<p>
					Comunidad de tatuajes en Chile. Busca el tatuaje que mejor
					se adapte a tu piel
				</p>
			</header>
			<nav>
				<HTMLAnchor href="/tatuadores">
					<Icon name="icon-park-solid:english-mustache" size="30px" />
					Tatuadores
				</HTMLAnchor>
				<HTMLAnchor href="/tatuadores" :primary="true">
					Ir a buscar
				</HTMLAnchor>
			</nav>
		</section>
	</section>
</template>

<style lang="scss">
.Main {
	margin-top: 80px;
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
}
</style>
