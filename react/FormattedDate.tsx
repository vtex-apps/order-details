import React from 'react'
import { FormattedDate } from 'react-intl'

const CustomDate = ({ date, style = '' }: { date: string; style: string }) => {
  let settings

  switch (style.toLowerCase()) {
    case 'short':
      settings = {}
      break
    default:
      settings = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }
  }

  return <FormattedDate value={date} {...settings} />
}

export default CustomDate
