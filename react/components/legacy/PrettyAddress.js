import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const PrettyAddress = ({
  address: {
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
    <div className="t-body">
      <p className="lh-solid">
        {street}, {number}{complement ? ` - ${complement}` : null}
      </p>
      <p className="lh-solid">{neighborhood}</p>
      <p className="lh-solid">
        {city} - {state}
      </p>
      <p className="lh-solid">
        {postalCode} {country && `- ${country}`}
      </p>
    </div>
  )
}

PrettyAddress.propTypes = {
  address: PropTypes.object.isRequired,
  type: PropTypes.string,
}

export default PrettyAddress
