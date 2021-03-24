import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'

import ButtonLink from './ButtonLink'

const messages = defineMessages({
  printReceiptButton: {
    id: 'store/order.header.takeaway.printreceipt.button',
    defaultMessage: '',
  },
  updateButton: { id: 'store/order.header.update.button', defaultMessage: '' },
  myOrdersButton: {
    id: 'store/order.header.myorders.button',
    defaultMessage: '',
  },
  takeAwayCancelButton: {
    id: 'store/order.header.takeaway.cancel.button',
    defaultMessage: '',
  },
  cancelButton: { id: 'store/order.header.cancel.button', defaultMessage: '' },
})

const CSS_HANDLES = [
  'cancellationButtonWrapper',
  'myOrdersButtonWrapper',
  'printReceiptButtonWrapper',
  'updateOrderButtonWrapper',
  'printReceiptButton',
  'updateButton',
  'myOrdersButton',
  'takeAwayCancelButton',
  'cancelButton',
] as const

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
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${className} flex flex-wrap justify-center flex-nowrap-m`}>
      {takeaway ? (
        <div
          className={`${
            handles.printReceiptButtonWrapper
          } mr5-ns mb5-s mb0-m w-100 w-auto-m`}>
          <ButtonLink
            className={handles.printReceiptButton}
            variation="secondary"
            fullWidth={fullWidth}
            to="">
            {intl.formatMessage(messages.printReceiptButton)}
          </ButtonLink>
        </div>
      ) : (
        <div
          className={`${
            handles.updateOrderButtonWrapper
          } mr5-ns mb5-s mb0-m w-100 w-auto-m`}>
          <ButtonLink
            className={handles.updateButton}
            variation="secondary"
            fullWidth={fullWidth}
            to={`/account#/orders/${orderId}/edit`}>
            {intl.formatMessage(messages.updateButton)}
          </ButtonLink>
        </div>
      )}
      {!takeaway && (
        <div
          className={`${
            handles.myOrdersButtonWrapper
          } mr5-ns mb5-s mb0-m w-100 w-auto-m`}>
          <ButtonLink
            className={handles.myOrdersButton}
            variation="secondary"
            fullWidth={fullWidth}
            to="/account#/orders/">
            {intl.formatMessage(messages.myOrdersButton)}
          </ButtonLink>
        </div>
      )}
      {allowCancellation && (
        <div className={`${handles.cancellationButtonWrapper} w-100 w-auto-m`}>
          {takeaway ? (
            <ButtonLink
              className={handles.takeAwayCancelButton}
              variation="danger-tertiary"
              fullWidth={fullWidth}
              to="">
              {intl.formatMessage(messages.takeAwayCancelButton)}
            </ButtonLink>
          ) : (
            <ButtonLink
              className={handles.cancelButton}
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
}

export default injectIntl(OrderOptions)
