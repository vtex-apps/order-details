import PropTypes from 'prop-types'
import React from 'react'

import ProductPrice from './ProductPrice'
import ProductImage from './ProductImage'

import './global.css'

const Product = props => {
  const {
    imageUrl,
    detailUrl,
    name,
    sellerName,
    price,
    currencyCode,
    quantity,
    measurementUnit,
    isGift,
  } = props

  return (
    <tr>
      <td className="myo-product-info pv3 tl v-top overflow-hidden">
        <ProductImage
          className="myo-product-image mw4-ns fl mr5"
          url={imageUrl}
          alt={name}
        />
        <div className="fl overflow-hidden w-80-ns">
          <p
            href={detailUrl}
            className="myo-product-name fw7 f6 mb0"
            target="_blank">
            {name}
          </p>
          <span className="myo-seller-name f7 c-muted-1 db">{sellerName}</span>
        </div>
      </td>
      <td className="myo-product-price pl2-ns pt3 tl v-top dn dtc-ns">
        <ProductPrice value={price} isGift={isGift} currency={currencyCode} />
      </td>
      <td className="myo-product-quantity pl2-ns pt3 tl v-top">
        {quantity} {measurementUnit}
      </td>
      <td className="myo-product-total-price pl1-l pt3 tl v-top">
        <ProductPrice
          value={price * quantity}
          isGift={isGift}
          currency={currencyCode}
        />
      </td>
    </tr>
  )
}

Product.propTypes = {
  imageUrl: PropTypes.string,
  detailUrl: PropTypes.string,
  name: PropTypes.string,
  sellerName: PropTypes.string,
  price: PropTypes.number,
  currencyCode: PropTypes.string,
  quantity: PropTypes.number,
  measurementUnit: PropTypes.string,
  isGift: PropTypes.bool,
  attachments: PropTypes.array,
}

export default Product
