import React from 'react'
import PropTypes from 'prop-types'

import ProductImage from './ProductImage'
import ProductPrice from './ProductPrice'

const Product = ({ productInfo }) => (
  <div className="flex justify-between mb items-center">
    <ProductImage
      url="http://recorrenciaqa.vteximg.com.br/arquivos/ids/155417-55-55/mambo.png?v=636093678308170000"
      alt={productInfo.name}
      className="w3"
    />
    <p href={productInfo.detailUrl} className="t-body" target="_blank">
      {productInfo.name} <br />
      <small className="t-small">
        {productInfo.quantity} {productInfo.measurementUnit}
      </small>
    </p>
    <ProductPrice value={productInfo.price * productInfo.quantity} currency="BRL" />
  </div>
)

Product.propTypes = {
  productInfo: PropTypes.object.isRequired,
}

export default Product
