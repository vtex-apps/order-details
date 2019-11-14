import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'

import Tooltip from './icons/Tooltip'

const messages = defineMessages({
  paymentId: { id: 'store/payments.id', defaultMessage: '' },
  transactionId: { id: 'store/payments.transaction.id', defaultMessage: '' },
})

interface Props {
  paymentId: string
  transactionId: string
  showTooltip?: boolean
}

const AdditionalInfo: FunctionComponent<Props & InjectedIntlProps> = ({
  paymentId,
  transactionId,
  showTooltip,
  intl,
}) => (
  <div className="flex flex-column">
    {showTooltip && <Tooltip colorToken="c-on-base" />}
    <div className="bg-base--inverted pa4 br2">
      <p className="c-on-base--inverted tc">
        {intl.formatMessage(messages.paymentId, { id: paymentId })}
      </p>
      <p className="c-on-base--inverted tc">
        {intl.formatMessage(messages.transactionId, {
          id: transactionId,
        })}
      </p>
    </div>
  </div>
)

export default injectIntl(AdditionalInfo)
