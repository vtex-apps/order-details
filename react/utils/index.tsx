import { defineMessages } from 'react-intl'

const messages = defineMessages({
  nPickup_nTakeaway: {
    id: 'store/order.split.n.pickup.n.takeaway',
    defaultMessage: '',
  },
  noPickup_nTakeaway: {
    id: 'store/order.split.no.pickup.n.takeaway',
    defaultMessage: '',
  },
  nPickup_noTakeaway: {
    id: 'store/order.split.n.pickup.no.takeaway',
    defaultMessage: '',
  },
  noPickup_noTakeaway: {
    id: 'store/order.split.no.pickup.no.takeaway',
    defaultMessage: '',
  },
  day: {
    id: 'store/items.attachments.subscription.frequency.day',
    defaultMessage: '',
  },
  month: {
    id: 'store/items.attachments.subscription.frequency.month',
    defaultMessage: '',
  },
  week: {
    id: 'store/items.attachments.subscription.frequency.week',
    defaultMessage: '',
  },
  year: {
    id: 'store/items.attachments.subscription.frequency.year',
    defaultMessage: '',
  },
  purchaseday: {
    id: 'store/items.attachments.subscription.purchaseday',
    defaultMessage: '',
  },
})

export const getPaymentGroupFromOrder = (order: Order) => ({
  barCodeNumber:
    order.paymentData.transactions[0].payments[0]
      .bankIssuedInvoiceBarCodeNumber,
  barCodePNG:
    order.paymentData.transactions[0].payments[0].bankIssuedInvoiceBarCodePNG,
  dueDate: order.paymentData.transactions[0].payments[0].dueDate,
  paymentGroup: order.paymentData.transactions[0].payments[0].group,
  paymentSystemName:
    order.paymentData.transactions[0].payments[0].paymentSystemName,
  url: order.paymentData.transactions[0].payments[0].url,
  value: order.paymentData.transactions[0].payments[0].value,
})

export interface PaymentGroupInfo {
  barCodeNumber: string | null
  barCodePNG: string | null
  dueDate: string | null
  paymentGroup: string
  paymentSystemName: string
  url: string | null
  value: number
}

export const isSubscription = (attachmentItem: Attachment) =>
  attachmentItem.name.indexOf('vtex.subscription') === 0

export const getSubscriptionInfo = (
  attachmentItem: Attachment,
  intl: ReactIntl.InjectedIntl
) => {
  if (!isSubscription(attachmentItem)) {
    return {}
  }
  const vtexSubsPrefix = 'vtex.subscription.key.'
  const subsFrequency: string =
    attachmentItem.content[`${vtexSubsPrefix}frequency`]
  const subsPurchaseDay: string =
    attachmentItem.content[`${vtexSubsPrefix}purchaseday`]
  const subsValidityBegin: string =
    attachmentItem.content[`${vtexSubsPrefix}validity.begin`]
  const subsValidityEnd: string =
    attachmentItem.content[`${vtexSubsPrefix}validity.end`]

  // This matches a key in the format: "3 months"
  const numberPeriodRegex = /([\d]{1,3}) ([A-z]{1,20})/
  // This matches a key in the format: "weekly"
  const wordlyPeriodRegex = /([A-z]{1,20})/

  let subsFrequencyString = ''
  if (numberPeriodRegex.test(subsFrequency)) {
    const frequency = numberPeriodRegex.exec(subsFrequency)
    if (frequency && frequency.length > 2) {
      subsFrequencyString = intl.formatMessage(
        {
          id: `store/items.attachments.subscription.frequency.${frequency[2]}`,
        },
        {
          frequencyNumber: parseInt(frequency[1], 10),
        }
      )
    }
  } else if (wordlyPeriodRegex.test(subsFrequency)) {
    const frequency = wordlyPeriodRegex.exec(subsFrequency)
    if (frequency && frequency.length > 0) {
      subsFrequencyString = intl.formatMessage({
        id: `store/items.attachments.subscription.frequency.${frequency[1]}`,
      })
    }
  }

  const subsPurchaseDayString =
    subsPurchaseDay !== ''
      ? intl.formatMessage(
          { id: 'store/items.attachments.subscription.purchaseday' },
          { purchaseday: subsPurchaseDay }
        )
      : null

  return {
    subsFrequency: subsFrequencyString,
    subsPurchaseDay: subsPurchaseDayString,
    subsValidityBegin,
    subsValidityEnd,
  }
}

export const orderSplitMessage = ({
  deliveries,
  pickups,
  takeaways,
  intl,
}: {
  deliveries: number
  pickups: number
  takeaways: number
  intl: ReactIntl.InjectedIntl
}) => {
  const nPickups = pickups > 1
  const nTakeaways = takeaways > 1

  let message = messages.noPickup_noTakeaway
  if (nPickups && nTakeaways) {
    message = messages.nPickup_nTakeaway
  } else if (nTakeaways) {
    message = messages.noPickup_nTakeaway
  } else if (nPickups) {
    message = messages.nPickup_noTakeaway
  }

  return intl.formatMessage(message, { deliveries, pickups, takeaways })
}

export function parseBankInvoiceUrl({
  url,
  rootPath = '',
}: {
  url: string
  rootPath?: string
}) {
  const isEncrypted = Boolean(url.match(/(\*.\*.)+\*\w\*/g))
  if (!isEncrypted) return url

  const encodedPath = encodeURIComponent(
    window.location.pathname + window.location.search
  )

  return `${rootPath}/login?returnUrl=${encodedPath}`
}
