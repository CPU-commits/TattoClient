import type { $DATE, OID } from '../body.model'

export type Category = {
	_id: OID
	name: string
	slug: string
	state: boolean
	description: string
	date: $DATE
}
