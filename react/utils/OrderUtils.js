class OrderUtils {
  static getReplacementHistory(order, parentOrders) {
    const current = { ...order, isCurrent: true }
    if (!parentOrders.length) {
      return []
    }
    return [current, ...parentOrders].sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
    )
  }

  static mapOrder(order) {
    if (order) {
      const orderFullStateData = this.getFullState(order.status)

      order.stateLabel = orderFullStateData.label
      order.stateStatus = orderFullStateData.status
      order.stateStep = orderFullStateData.step

      order.items = order.items.map((item, index) => {
        item.sellerName = order.sellers.find(
          seller => seller.id === item.seller
        ).name

        item.logisticsInfo = order.shippingData.logisticsInfo.find(
          log => log.itemIndex === index
        )
        const { shippingEstimate, shippingEstimateDate } = item.logisticsInfo

        item = {
          ...item,
          shippingEstimate: shippingEstimate,
          shippingEstimateDate: shippingEstimateDate,
        }

        return item
      })
      return order
    }
  }

  static isOrderActive(state) {
    return !['replace', 'replaced', 'cancel', 'canceled'].includes(state)
  }

  static getBankInvoiceUrl(transactions) {
    for (const transaction of transactions) {
      for (const payment of transaction.payments) {
        if (payment.url) {
          return payment.url
        }
      }
    }
    return null
  }

  static isOrderFinished(state) {
    return ![
      'payment-pending',
      'payment-approved',
      'handling',
      'ready-for-handling',
      'request-cancel',
      'window-to-cancel',
      'waiting-for-seller-confirmation',
      'waiting-for-seller-decision',
      'request-cancel',
      'ship',
      'cancel',
      'invoice',
      'cancellation-requested',
    ].includes(state)
  }

  static getFullState(state) {
    switch (state) {
      case 'waiting-for-seller-confirmation':
      case 'order-created':
      case 'order-completed':
      case 'on-order-completed':
        return {
          label: 'Processando',
          status: 'pending',
          step: 0 /* UI-only, renders order current step in OrderFlow of ViewOrder page */,
        }
      case 'payment-pending':
        return {
          label: 'Processando Pagamento',
          status: 'pending',
          step: 1,
        }
      case 'window-to-cancel':
      case 'approve-payment':
        return {
          label: 'Carência para cancelamento',
          status: 'pending',
          step: 2,
        }
      case 'payment-approved':
        return {
          label: 'Pagamento Aprovado',
          status: 'normal',
          step: 2,
        }
      case 'request-cancel':
        return {
          label: 'Cancelado solicitado',
          status: 'pending',
          step: 2,
        }
      case 'cancel':
        return {
          label: 'Processando Cancelamento',
          status: 'pending',
          step: 2,
        }
      case 'canceled':
        return {
          label: 'Cancelado',
          status: 'cancelled',
          step: null,
        }
      case 'waiting-for-seller-decision':
        return {
          label: 'Cancelamento solicitado',
          status: 'pending',
          step: 2,
        }
      case 'invoice':
        return {
          label: 'Enviando',
          status: 'normal',
          step: 4,
        }
      case 'invoiced':
        return {
          label: 'Enviado',
          status: 'success',
          step: 5,
        }
      case 'replaced':
        return {
          label: 'Substituído',
          status: 'disabled',
          step: null,
        }
      default:
        return {
          label: state,
          status: 'normal',
          step: 0,
        }
    }
  }
}

export default OrderUtils
