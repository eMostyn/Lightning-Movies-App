const formatDate = (date) => {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  var date = new Date(date)
  const formattedDate = `${date.getDate()}th ${months[date.getMonth()]} ${date.getFullYear()}`
  return formattedDate
}

export { formatDate }
