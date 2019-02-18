import React, { Fragment, FunctionComponent } from 'react'
import ProductList from '../ProductList'
import ShippingHeader from './ShippingHeader'

interface Props {
  deliveryPackages: Parcel[]
  giftRegistryData?: GiftRegistry | null
  currency: string
}

const Shipping: FunctionComponent<Props> = ({
  deliveryPackages,
  giftRegistryData,
  currency,
}) => (
  <Fragment>
    {deliveryPackages.map((delivery, index) => (
      <section
        className="mv8 flex justify-between flex-column flex-row-m"
        key={index}
      >
        <ShippingHeader
          shippingData={delivery}
          index={index}
          numPackages={deliveryPackages.length}
          giftRegistry={giftRegistryData}
        />
        <ProductList products={delivery.items} currency={currency} />
      </section>
    ))}
  </Fragment>
)
export default Shipping
