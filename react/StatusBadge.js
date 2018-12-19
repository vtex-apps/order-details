import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import OrderUtils from './utils/OrderUtils'

const StatusBadge = ({ state }) => {
  const { status } = OrderUtils.getFullState(state)

  let styles
  let textStyle = ''

  switch (status) {
    case 'normal':
      styles = 'bg-muted-1'
      textStyle = 'c-on-muted-1'
      break
    case 'cancelled':
      styles = 'bg-danger'
      textStyle = 'c-on-danger'
      break
    case 'pending':
      styles = 'bg-warning'
      break
    case 'disabled':
      styles = 'bg-muted-2'
      textStyle = 'c-on-muted-2'
      break
    case 'success':
      styles = 'bg-success'
      textStyle = 'c-on-success'
      break
    default:
      styles = 'bg-muted-2'
      textStyle = 'c-on-muted-2'
  }

  return (
    <div className={`dib br2 pv2 ph3 f7 fw5 tc ${styles}`}>
      <span className={textStyle || 'c-on-base'}>
        <FormattedMessage id={`order.state.${state}`} />
      </span>
    </div>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string,
  state: PropTypes.string.isRequired,
}

export default StatusBadge
