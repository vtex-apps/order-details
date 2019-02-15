import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { utils } from 'vtex.my-account-commons'

import Product from '../Product'
import BundleItem from './BundleItem'
import Attachment from './Attachment'

const { reduceBundleItems } = utils

const Products = props => {
  const { items, currencyCode } = props
  const itemsWithBundleItems = reduceBundleItems(items)
  return (
    <table className="myo-product-table collapse table w-100 mt7">
      <thead>
        <tr className="tl">
          <th className="pa0 w-60 w-50-ns pb3">
            <FormattedMessage id="order.package.product" />
          </th>
          <th className="pa0 w-20 pl2 pr2 pb3 dn dtc-ns">
            <FormattedMessage id="order.package.price" />
          </th>
          <th className="pa0 w-20 pl2 pr2 pb3">
            <FormattedMessage id="order.package.quantity" />
          </th>
          <th className="pa0 w-30 w-20-ns pb3">
            <FormattedMessage id="order.package.total" />
          </th>
        </tr>
      </thead>
      <tbody>
        {itemsWithBundleItems.map((product, index) => {
          if (product.isBundleItem) {
            return (
              <BundleItem
                key={index}
                currencyCode={currencyCode}
                name={product.name}
                price={product.sellingPrice}
                quantity={product.parentItemQuantity * product.quantity}
                isGift={product.isGift}
                attachments={product.attachments}
              />
            )
          }

          if (product.isAttachment) {
            return (
              <Attachment
                key={index}
                name={product.name}
                content={product.content}
              />
            )
          }

          return (
            <Product
              key={index}
              productInfo={product}
            />
          )
        })}
      </tbody>
    </table>
  )
}

Products.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  currencyCode: PropTypes.string,
  sellers: PropTypes.arrayOf(PropTypes.object),
}

export default Products
