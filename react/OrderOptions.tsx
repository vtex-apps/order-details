import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'

import ButtonLink from './ButtonLink'

const messages = defineMessages({
  printreceiptButton: {
    id: 'store/order.header.takeaway.printreceipt.button',
    defaultMessage: '',
  },
  updateButton: { id: 'store/order.header.update.button', defaultMessage: '' },
  myordersButton: {
    id: 'store/order.header.myorders.button',
    defaultMessage: '',
  },
  takeawayCancelButton: {
    id: 'store/order.header.takeaway.cancel.button',
    defaultMessage: '',
  },
  cancelButton: { id: 'store/order.header.cancel.button', defaultMessage: '' },
})

interface Props {
  allowCancellation: boolean
  takeaway?: boolean
  className?: string
  fullWidth?: boolean
  orderId?: string
}

const OrderOptions: FunctionComponent<Props & InjectedIntlProps> = ({
  allowCancellation,
  takeaway,
  intl,
  className = '',
  fullWidth,
  orderId,
}) => (
  <div className={`${className} flex flex-wrap justify-center flex-nowrap-m`}>
    <div className="mr5-ns mb5-s mb0-m w-100 w-auto-m">
      {takeaway ? (
        <ButtonLink variation="secondary" fullWidth={fullWidth} to="">
          {intl.formatMessage(messages.printreceiptButton)}
        </ButtonLink>
      ) : (
        <ButtonLink
          variation="secondary"
          fullWidth={fullWidth}
          to={`/account#/orders/${orderId}/edit`}>
          {intl.formatMessage(messages.updateButton)}
        </ButtonLink>
      )}
    </div>
    {!takeaway && (
      <div className="mr5-ns mb5-s mb0-m w-100 w-auto-m">
        <ButtonLink
          variation="secondary"
          fullWidth={fullWidth}
          to="/account#/orders/">
          {intl.formatMessage(messages.myordersButton)}
        </ButtonLink>
      </div>
    )}
    {allowCancellation && (
      <div className="w-100 w-auto-m">
        {takeaway ? (
          <ButtonLink variation="danger-tertiary" fullWidth={fullWidth} to="">
            {intl.formatMessage(messages.takeawayCancelButton)}
          </ButtonLink>
        ) : (
          <ButtonLink
            variation="danger-tertiary"
            fullWidth={fullWidth}
            to={`/account#/orders/${orderId}/cancel`}>
            {intl.formatMessage(messages.cancelButton)}
          </ButtonLink>
        )}
      </div>
    )}
  </div>
)

export default injectIntl(OrderOptions)
