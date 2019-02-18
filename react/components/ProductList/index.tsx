import React, { FunctionComponent } from 'react'
import ProductAttachment from './Attachment'
import Product from './Product'

interface Props {
  products: OrderItem[]
  currency: string
}

const ProductList: FunctionComponent<Props> = ({ products, currency }) => {
  return (
    <div className="flex flex-column justify-between w-100 w-75-m">
      {products.map((product: OrderItem, index: number) => (
        <article
          className={`${
            index !== products.length - 1 ? 'bb b--muted-5 pb4' : ''
          }`}
          key={product.id}
        >
          <Product productInfo={product} currency={currency} />
          {(product.bundleItems || product.attachments) && (
            <ProductAttachment
              attachmentsInfo={product.attachments}
              bundleInfo={product.bundleItems}
              currency={currency}
            />
          )}
        </article>
      ))}
    </div>
  )
}

export default ProductList
