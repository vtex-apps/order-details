import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PrettyAddress = ({
  address: {
    receiverName,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    postalCode,
    country,
  },
  type,
}) => {
  if (type === 'short') {
    return (
      <Fragment>
        {street}, {number}
      </Fragment>
    )
  }

  return (
    <div className="f6">
      <p className="lh-solid">
        <strong>{receiverName}</strong>
      </p>
      <p className="lh-solid">
        {street}, {number}{complement ? ` - ${complement}` : null}
      </p>
      <p className="lh-solid">{neighborhood}</p>
      <p className="lh-solid">
        {city} - {state}
      </p>
      <p className="lh-solid">
        {postalCode} - {country}
      </p>
    </div>
  )
}

PrettyAddress.propTypes = {
  address: PropTypes.object.isRequired,
  type: PropTypes.string,
}

export default PrettyAddress
