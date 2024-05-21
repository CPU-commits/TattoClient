import { Service } from './service'
import type { Calendar } from '~/models/calendar/calendar.model'
import type { BodyFetch } from '~/models/body.model'

export class CalendarService extends Service {
	async getCalendar() {
		return await this.fetch<BodyFetch<Calendar>>({
			method: 'get',
			URL: '/api/v1/calendars',
		}).then(({ body }) => body)
	}

	async addCalendarBlock(calendarBlock: {
		day: string
		block_from: string
		block_to: string
	}) {
		await this.fetch({
			method: 'post',
			URL: '/api/v1/calendars/blocks',
			body: {
				day: calendarBlock.day,
				time_until: calendarBlock.block_from,
				time_since: calendarBlock.block_to,
			},
		})
	}
}
