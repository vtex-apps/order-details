import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import ProductList from '../ProductList'

interface Props {
  takeAwayPackages: Parcel[]
  currency: string
}

const TakeAway: FunctionComponent<Props & InjectedIntlProps> = ({
  takeAwayPackages,
  currency,
  intl,
}) => (
  <section className="mv8 flex flex-column justify-between">
    <header>
      <p data-testid="shipping-header" className="t-heading-4-ns t-heading-5">
        {intl.formatMessage({ id: 'takeaway.header.title' })}
      </p>
    </header>
    <ProductList products={takeAwayPackages[0].items} currency={currency} />
  </section>
)

export default injectIntl(TakeAway)
