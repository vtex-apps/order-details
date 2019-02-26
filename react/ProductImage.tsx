import React, { Fragment, FunctionComponent, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector'

import { utils } from 'vtex.my-account-commons'

const { fixImageUrl } = utils

interface Props {
  url: string
  alt: string
}

const ProductImage: FunctionComponent<Props & any> = ({
  url,
  alt,
  ...props
}: Props) => {
  const [maxWidth, setMaxWidth] = useState(50)
  const [maxHeight, setMaxHeight] = useState(50)

  const resizeHandler = (width: number, height: number) => {
    if (width > maxWidth) {
      setMaxWidth(width + 50)
    }
    if (height > maxHeight) {
      setMaxHeight(height + 50)
    }
  }

  return (
    <Fragment>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width: number, height: number) =>
          resizeHandler(width, height)
        }
      />
      <img src={fixImageUrl(url, maxWidth, maxHeight)} alt={alt} {...props} />
    </Fragment>
  )
}

export default ProductImage
