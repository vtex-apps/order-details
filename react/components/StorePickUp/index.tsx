import React, { Fragment, FunctionComponent } from 'react'

import ProductList from '../ProductList'
import StorePickUpHeader from './StorePickUpHeader'

interface Props {
  pickUpPackages: Parcel[]
  currency: string
}

const StorePickUp: FunctionComponent<Props> = ({
  pickUpPackages,
  currency,
}) => (
  <Fragment>
    {pickUpPackages.map((pickup: Parcel, index: number) => (
      <section
        className="mv8 flex justify-between flex-column flex-row-m"
        key={index}
      >
        <StorePickUpHeader
          shippingData={pickup}
          index={index}
          numPackages={pickUpPackages.length}
        />
        <ProductList products={pickup.items} currency={currency} />
      </section>
    ))}
  </Fragment>
)

export default StorePickUp
