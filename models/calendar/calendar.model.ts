import type { $DATE, OID } from '../body.model'

export type Calendar = {
	_id: OID
	days: Array<{
		day: 'M' | 'T' | 'W' | 'X' | 'F' | 'S' | 'SU'
		block: number
	}>
	exceptions: Array<{
		day: $DATE
		hour_start: $DATE
		hour_finish: $DATE
	}>
	settings: {
		days_advance: number
	}
	created_at: $DATE
	updated_at: $DATE
}
