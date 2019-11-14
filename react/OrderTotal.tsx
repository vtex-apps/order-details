import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'

import Price from './FormattedPrice'

const messages = defineMessages({
  subtotal: { id: 'store/order.totals.subtotal', defaultMessage: '' },
  delivery: { id: 'store/order.totals.delivery', defaultMessage: '' },
  total: { id: 'store/order.totals.total', defaultMessage: '' },
})

interface Props {
  items: OrderItem[]
  totals: OrderItemTotal[]
  orderValue: number
  currency: string
}

const ShippingTotals: FunctionComponent<Props & InjectedIntlProps> = ({
  items,
  totals,
  orderValue,
  currency,
  intl,
}) => {
  const numItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalsLine = 'flex justify-between items-center c-muted-1'

  return (
    <div className="flex-l justify-end pl6-l w-100">
      <div className="mv8 w-100 w-60-l">
        <div className={totalsLine}>
          <p className="mv3">
            {intl.formatMessage(messages.subtotal, { numItems })}
          </p>
          <div className="c-on-base">
            <Price value={totals[0].value} currency={currency} />
          </div>
        </div>
        <div className={totalsLine}>
          <p className="mv3">{intl.formatMessage(messages.delivery)}</p>
          <div className="c-on-base">
            <Price value={totals[2].value} currency={currency} />
          </div>
        </div>
        <div className="flex justify-between items-center c-on-base">
          <p className="t-heading-2-ns t-heading-3 mv4">
            <strong>{intl.formatMessage(messages.total)}</strong>
          </p>
          <strong className="t-heading-2-ns t-heading-3 mv4">
            <Price value={orderValue} currency={currency} />
          </strong>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(ShippingTotals)
