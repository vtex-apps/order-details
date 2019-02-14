import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import ReactResizeDetector from "react-resize-detector";

import { utils } from "vtex.my-account-commons";

const { fixImageUrl } = utils;

function ProductImage({ className, url, alt }) {

  const [maxWidth, setMaxWidth] = useState(50)
  const [maxHeight, setMaxHeight] = useState(50)
  const [lastUrl, setLastUrl] = useState(url)

  const resizeHandler = (width, height) => {
    if(width > maxWidth) setMaxWidth(width)
    if(height > maxHeight) setMaxHeight(height)

    return
  }

  return (
    <Fragment>
      <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => resizeHandler(width, height)} />
      <img
        className={`${className}`}
        src={fixImageUrl(lastUrl, maxWidth, maxHeight)}
        alt={alt}
      />
    </Fragment>
  )
}

ProductImage.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  alt: PropTypes.string
};

export default ProductImage;
