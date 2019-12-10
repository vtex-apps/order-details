import React, { FunctionComponent } from 'react'
import {
  FormattedMessage,
  FormattedTime,
  InjectedIntlProps,
  injectIntl,
  defineMessages,
} from 'react-intl'
import { compose } from 'recompose'
import { RenderContextProps, withRuntimeContext } from 'vtex.render-runtime'

import FormattedDate from './FormattedDate'
import OrderOptions from './OrderOptions'

const messages = defineMessages({
  number: { id: 'store/order.header.number', defaultMessage: '' },
  receipt: { id: 'store/order.header.receipt', defaultMessage: '' },
})

interface Props {
  orderInfo: Order
  takeaway?: boolean
  runtime?: { account: string }
}

const OrderHeader: FunctionComponent<
  Props & InjectedIntlProps & RenderContextProps
> = ({ orderInfo, takeaway, intl, runtime }) => {
  const storeAccount = runtime.account
  const orderSeller = orderInfo.sellers[0].name

  return (
    <header className="flex justify-between items-center">
      <p className="t-heading-3 lh-copy">
        {intl.formatMessage(messages.number, {
          orderId: orderInfo.orderId,
        })}
        <br />
        <small className="c-muted-2 t-body">
          <FormattedMessage
            id="store/order.header.date"
            values={{
              orderDate: (
                <FormattedDate date={orderInfo.creationDate} style="short" />
              ),
              orderTime: <FormattedTime value={orderInfo.creationDate} />,
            }}
          />
        </small>
        <br />
        {storeAccount !== orderSeller && (
          <small className="c-muted-2 t-body">
            <FormattedMessage
              id="store/order.header.seller"
              values={{
                seller: <span className="c-action-primary">{orderSeller}</span>,
              }}
            />
          </small>
        )}
        {takeaway && (
          <a className="c-action-primary t-small" href="#">
            {intl.formatMessage(messages.receipt)}
          </a>
        )}
      </p>
      <OrderOptions
        className="dn-s flex-l"
        allowCancellation={orderInfo.allowCancellation}
        orderId={orderInfo.orderId}
        takeaway={takeaway}
      />
    </header>
  )
}

export default compose<Props & InjectedIntlProps & RenderContextProps, Props>(
  withRuntimeContext,
  injectIntl
)(OrderHeader)
