export function formatNumber(n) {
    return n < 10 ? `0${n}` : n
}

export function getDateTimeFromMS(ms) {
    const date = new Date(parseInt(ms))

    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    month = formatNumber(month)
    day = formatNumber(day)

    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    hour = formatNumber(hour)
    minute = formatNumber(minute)
    second = formatNumber(second)

    return [[year, month, day].join('/'), [hour, minute, second].join(':')].join(' ')
}
