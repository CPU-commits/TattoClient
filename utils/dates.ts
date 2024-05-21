import dayjs from 'dayjs'

export function differentDates(
	dateOne: string | Date,
	dateTwo: string | Date,
): boolean {
	return dayjs(dateOne).diff(dateTwo) !== 0
}

export function dateIsAfter(
	dateOne: string | Date,
	dateTwo: string | Date,
): boolean {
	return dayjs(dateOne).isAfter(dateTwo)
}

export function dateIsBefore(
	dateOne: string | Date,
	dateTwo: string | Date,
): boolean {
	return dayjs(dateOne).isBefore(dateTwo)
}

export function convertToTime(i: number) {
	if (i <= 12)
		if (i === 12) return i.toString() + ' PM'
		else return i.toString() + ' AM'
	else if (i === 24) return '12 AM'
	else return (i - 12).toString() + ' PM'
}
