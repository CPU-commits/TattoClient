import type { $DATE, OID } from '@/models/body.model'

export type Like = {
	_id: OID
	user: OID
	profile: OID
	post: OID
	date: $DATE
}
