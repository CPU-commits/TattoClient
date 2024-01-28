import type { DefaultResponse } from '~/common/fetchModule'

export type BodyFetch<T> = {
	body: T
} & DefaultResponse

export type OID = {
	$oid: string
}

export type $DATE = {
	$date: number
}

export type QueryParams = {
	page?: number
	count?: boolean
}
