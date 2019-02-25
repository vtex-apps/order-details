import React, { FunctionComponent } from 'react'
import { FormattedNumber } from 'react-intl'

interface Props {
  value: number
  currency: string
}

const Price: FunctionComponent<Props> = ({ value, currency }) => {
  return (
    <FormattedNumber currency={currency} style="currency" value={value / 100} />
  )
}

export default Price
