// regex for strings between 00:00 and 23:59
export const timeStringRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/

export const dateTimeStringRegex =
  /^(\d{4})-(\d{2})-(\d{2})T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/

export const dateStringRegex = /^(\d{4})-(\d{2})-(\d{2})$/
