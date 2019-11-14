import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'

import FormattedPrice from './FormattedPrice'
import ProductImage from './ProductImage'

const messages = defineMessages({
  quantity: { id: 'store/products.quantity', defaultMessage: '' },
})

interface Props {
  productInfo: OrderItem
  currency: string
}

const Product: FunctionComponent<Props & InjectedIntlProps> = ({
  productInfo,
  currency,
  intl,
}) => {
  const showMeasurementUnit =
    productInfo.unitMultiplier !== 1 || productInfo.measurementUnit !== 'un'

  return (
    <article className="flex justify-between flex-column-s flex-row-m pv7">
      <div className="flex items-center flex-column flex-row-m mr8-m">
        <div>
          <ProductImage
            url={productInfo.imageUrl}
            alt={productInfo.name}
            className="w4 mr6-m"
          />
        </div>
        <div className="flex flex-column items-between justify-between h-100">
          <a
            href={productInfo.detailUrl}
            className="t-body c-muted-1 no-underline"
            target="_blank">
            <p className="mt3">
              {productInfo.name}
              {showMeasurementUnit && (
                <small className="t-mini c-on-base tc tl-m">
                  <br />
                  {`${productInfo.unitMultiplier} ${
                    productInfo.measurementUnit
                  }`}
                </small>
              )}
            </p>
          </a>
          <p className="t-mini c-muted-1 tc tl-m mb3">
            {intl.formatMessage(messages.quantity, {
              quantity: productInfo.quantity,
            })}
          </p>
        </div>
      </div>
      <p className="tc tr-m mt3">
        <FormattedPrice
          value={productInfo.price * productInfo.quantity}
          currency={currency}
        />
      </p>
    </article>
  )
}

export default injectIntl(Product)
