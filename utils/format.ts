/* eslint-disable import/no-named-as-default-member */
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserTypes, UserTypesKeys } from '@/models/user/user.model'

dayjs.locale('es')
dayjs.extend(relativeTime)

export function formatDate(date: string | Date) {
	return capitalizeFirstLetter(dayjs(date).format('MMMM DD, YYYY h:mm A'))
}

export function formatDateLL(date: string | Date) {
	return capitalizeFirstLetter(dayjs(date).format('MMMM DD, YYYY'))
}

export function formatMiniDate(date: string | Date) {
	return dayjs(date).format('MM/DD HH:mm')
}

export function timeAgo(date: string | Date) {
	return dayjs(date).fromNow()
}

export function removeTime(date: string | Date) {
	return dayjs(date).startOf('day').format('YYYY-MM-DD')
}

export function getOnlyTime(date: string | Date) {
	return dayjs(date).format('HH:mm')
}

export function secondsToHoursFormat(seconds: number) {
	const hours = seconds / 3600
	let hoursFormat = `${Math.trunc(hours)}:`
	if (hoursFormat.length === 2) hoursFormat = `0${hoursFormat}`
	hoursFormat += `${Number((hours % 1).toFixed(2)) * 60}`
	if (hoursFormat.length === 4) {
		const lastDigit = hoursFormat[3]
		const string = hoursFormat
		hoursFormat = ''
		for (let i = 0; i < 3; i++) hoursFormat += string[i]
		hoursFormat += `0${lastDigit}`
	}
	return hoursFormat
}

export function urlify(text: string) {
	const urlRegex = /(https?:\/\/[^\s]+)/g
	return text.replace(urlRegex, function (url) {
		return (
			'<p class="Link"><a target="_blank" class="Link" href="' +
			url +
			'">' +
			url +
			'</a></p>'
		)
	})
}

export function formatDateUTC(date: string | Date) {
	return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function formateDateInput(date: string | Date) {
	return dayjs(date).format('YYYY-MM-DD')
}

export function intToChar(int: number) {
	const code = 'a'.charCodeAt(0)
	return String.fromCharCode(code + int)
}

export function isValidHttpUrl(string: string): boolean {
	let url: URL
	try {
		url = new URL(string)
	} catch (err) {
		return false
	}
	return url.protocol === 'http:' || url.protocol === 'https:'
}

export function formatUserType(userType: keyof typeof UserTypes) {
	if (userType === UserTypesKeys.ADMIN) return 'Administrador'
	if (userType === UserTypesKeys.STUDIO_OWNER) return 'Dueño de estudio'
	if (userType === UserTypesKeys.USER) return 'Cliente'
	if (userType === UserTypesKeys.TATTO) return 'Tatuador'
	return ''
}

export function capitalizeFirstLetter(string: string | Array<string>) {
	if (string instanceof Array) return string.join(' ')
	return string.charAt(0).toUpperCase() + string.slice(1)
}
