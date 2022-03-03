import dayjs from 'dayjs'

export function date(date: Date | string) {
  return dayjs(date).format('YYYY-MM-DD')
}
