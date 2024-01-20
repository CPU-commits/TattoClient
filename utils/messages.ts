export function maxLengthMsg(max: number, name: string) {
	return `El campo ${name} debe contener máximo ${max} cárac.`
}

export function minLengthMsg(min: number, name: string) {
	if (min === 1) return `El campo ${name} es requerido`
	return `El campo ${name} debe contener mínimo ${min} cárac.`
}

export function isEmailMsg(name: string) {
	return `El campo ${name} debe ser un email válido`
}
