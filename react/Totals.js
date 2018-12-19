import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import Total from './Total'
import FinalPrice from './FinalPrice'

const Totals = props => {
  const { totals, currencyCode, transactions } = props
  let interest = {
    id: 'Interest',
    name: 'Total de Juros',
    value: 0,
  }

  transactions.map(transaction => {
    if (transaction.isActive) {
      interest = transaction.payments.reduce((interest, pay) => {
        interest.value += pay.value - pay.referenceValue
        return interest
      }, interest)
    }
  })

  const newTotals = interest.value > 0 ? [...totals, interest] : totals

  return (
    <article className="w-100 fl w-third-m mb5">
      <section className="pa5 ba bw1 b--muted-5 overflow-y-scroll bg-base h4-plus">
        <h3 className="c-on-base mt2 mb5 tracked-mega lh-solid ttu f6">
          <FormattedMessage id="order.summary.title" />
        </h3>
        {newTotals &&
          newTotals.map(total => {
            if (total.name && total.value) {
              return (
                <Total
                  key={total.name}
                  total={total}
                  currencyCode={currencyCode}
                />
              )
            }
          })}
        <div className="cf w-100 mb7">
          <div className="dib fl f6 fw5 c-on-base w-50">
            <FormattedMessage id="order.summary.total" />
          </div>
          <div className="dib fr f6 fw5 c-on-base w-50 tr">
            <FinalPrice totals={newTotals} currencyCode={currencyCode} />
          </div>
        </div>
      </section>
    </article>
  )
}

Totals.propTypes = {
  totals: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencyCode: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Totals
