import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { FormattedMessage, FormattedDate } from 'react-intl'

import arrow from './images/arrow-up.svg'
import slugify from '../utils/slugify'

const ATTACHMENT_DATE_VALUES = [
  'vtex.subscription.key.validity.begin',
  'vtex.subscription.key.validity.end',
]

class Attachment extends Component {
  getAttachmentKeyTranslation(key) {
    return {
      id: key.replace('vtex.', 'order.'),
    }
  }

  getAttachmentValueTranslation(value) {
    const baseProps = {
      id: 'order.subscription.unkownValue',
      defaultValue: value,
    }

    // This matches a key in the format: "3 months"
    const numberPeriodRegex = /([\d]{1,3}) ([A-z]{1,50})/
    // This matches a key in the format: "weekly"
    const wordlyPeriodRegex = /([A-z]{1,50})/

    if (numberPeriodRegex.test(value)) {
      const result = numberPeriodRegex.exec(value)
      return {
        ...baseProps,
        id: `order.subscription.periodicity.${result[2]}`,
        values: { count: parseInt(result[1], 10) },
      }
    }

    if (wordlyPeriodRegex.test(value)) {
      const result = wordlyPeriodRegex.exec(value)
      return {
        ...baseProps,
        id: `order.subscription.periodicity.${result[1]}`,
      }
    }

    return baseProps
  }

  render() {
    const { name, content } = this.props
    const slugName = slugify(name)

    const isGiftWrap = name === 'message' && content.text
    if (isGiftWrap) {
      return (
        <tr
          className={`myo-attachment myo-attachment-gift-wrap myo-attachment-${slugName}`}>
          <td className="pa0 pv5 v-mid overflow-hidden">
            <div className="ml3 fl overflow-hidden w-80-ns">
              <blockquote className="gift-message">{content.text}</blockquote>
            </div>
          </td>
          <td className="dn dtc-ns" />
          <td />
          <td className="pa0 pv5 v-mid" />
        </tr>
      )
    }

    const isSubscription = name.indexOf('vtex.subscription') === 0

    return (
      <tr className={`myo-attachment myo-attachment-${slugName} bg-muted-5`}>
        <td className="pv3 tl v-top v-mid relative">
          <div className="ml9-ns mt3 fl w-80-ns">
            <img
              src={arrow}
              alt=""
              className="absolute"
              style={{ top: '-1px' }}
            />
            <p className="myo-attachment-name f5 mb0">
              {isSubscription ? (
                <FormattedMessage id="order.subscription" />
              ) : (
                name
              )}
            </p>
            <div className="pt5">
              {map(content, (value, key) => (
                <div
                  key={`${key}-${value}-${name}`}
                  className={`myo-attachment-${slugify(name)}-${slugify(
                    key
                  )} pb2 ${isSubscription && !value ? 'dn' : ''}`}>
                  <span className="myo-attachment-key fw7">
                    {isSubscription ? (
                      <FormattedMessage
                        {...this.getAttachmentKeyTranslation(key)}
                      />
                    ) : (
                      key
                    )}
                    :&nbsp;
                  </span>
                  <span className="myo-attachment-value">
                    {isSubscription && value ? (
                      ATTACHMENT_DATE_VALUES.indexOf(key) !== -1 ? (
                        <FormattedDate value={new Date(value)} />
                      ) : (
                        <FormattedMessage
                          {...this.getAttachmentValueTranslation(value)}
                        />
                      )
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </td>
        <td className="pv3 tl v-top dn dtc-ns" />
        <td />
        <td className="pv3 tl v-top v-mid" />
      </tr>
    )
  }
}

Attachment.propTypes = {
  name: PropTypes.string,
  content: PropTypes.object,
}

export default Attachment
