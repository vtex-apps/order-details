import React, { FunctionComponent, useState } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

import AdditionalInfo from './AdditionalInfo'
import ButtonLink from './ButtonLink'
import Price from './FormattedPrice'
import InfoIcon from './icons/Info'
import { parseBankInvoiceUrl } from './utils'
import { useCssHandles } from 'vtex.css-handles'

const messages = defineMessages({
  creditcard: { id: 'store/payments.creditcard', defaultMessage: '' },
  debitcard: { id: 'store/payments.debitcard', defaultMessage: '' },
  lastDigits: {
    id: 'store/payments.creditcard.lastDigits',
    defaultMessage: '',
  },
  giftCard: { id: 'store/payments.giftCard', defaultMessage: '' },
  installments: { id: 'store/payments.installments', defaultMessage: '' },
  print: { id: 'store/payments.bankinvoice.print', defaultMessage: '' },
})

interface Props {
  payment: Payment
  transactionId: string
  currency: string
}

const CSS_HANDLES = [
  'paymentGroup',
  'paymentValue'
] as const

const paymentGroupSwitch = (payment: Payment, intl: ReactIntl.InjectedIntl) => {
  switch (payment.group) {
    case 'creditCard':
      return intl.formatMessage(messages.creditcard)
    case 'bankInvoice':
      return payment.paymentSystemName
    case 'promissory':
      return payment.paymentSystemName
    case 'debitCard':
      return intl.formatMessage(messages.debitcard)
    case 'giftCard':
      return intl.formatMessage(messages.giftCard)
    default:
      return payment.paymentSystemName
  }
}

const PaymentMethod: FunctionComponent<Props & InjectedIntlProps> = ({
  payment,
  transactionId,
  currency,
  intl,
}) => {
  const { rootPath } = useRuntime()
  const [isOpen, setIsOpen] = useState(false)
  const hasLastDigits = !!payment.lastDigits
  const isBankInvoice = payment.group === 'bankInvoice'
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <article className="flex justify-between">
      <div className="t-body lh-solid">
        <p className={`${handles.paymentGroup} c-on-base`}>
          {paymentGroupSwitch(payment, intl)}
        </p>
        {hasLastDigits && (
          <p className="c-muted-1 mb3">
            {intl.formatMessage(messages.lastDigits, {
              lastDigits: payment.lastDigits,
            })}
          </p>
        )}
        <div className="flex items-center">
          <p className={`${handles.paymentValue} c-muted-1 mv0`}>
            <Price value={payment.value} currency={currency} />
            {` ${intl.formatMessage(messages.installments, {
              installments: payment.installments,
            })}`}
          </p>
          <div
            className="ml4"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
            <InfoIcon colorToken="c-muted-3" />
          </div>
        </div>
        <div hidden={!isOpen} className="mt2 z-2 absolute">
          <AdditionalInfo
            paymentId={payment.id}
            transactionId={transactionId}
            showTooltip={true}
          />
        </div>
        {isBankInvoice && payment.url && (
          <div className="mt5">
            <ButtonLink
              to={parseBankInvoiceUrl({ url: payment.url, rootPath })}
              variation="primary"
              openNewWindow>
              {intl.formatMessage(messages.print, {
                paymentSystemName: payment.paymentSystemName,
              })}
            </ButtonLink>
          </div>
        )}
      </div>
    </article>
  )
}

export default injectIntl(PaymentMethod)
