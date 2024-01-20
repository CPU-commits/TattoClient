import type { OID } from '@/models/body.model'

export enum UserTypes {
	'a',
	'b',
	'c',
	'd',
}

export enum UserTypesKeys {
	USER = 'a',
	TATTO = 'b',
	STUDIO_OWNER = 'c',
	ADMIN = 'd',
}

export type User = {
	_id: OID
	email: string
	name: string
	role: keyof typeof UserTypes
	state: 'active'
}
