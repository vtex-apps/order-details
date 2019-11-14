import React, { Fragment, FunctionComponent, useState } from 'react'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'
import { IconCaretDown, IconCaretUp } from 'vtex.styleguide'

import Price from './FormattedPrice'
import ProductImage from './ProductImage'
import Subscription from './Subscription'
import { isSubscription } from './utils'

const messages = defineMessages({
  free: { id: 'store/order.totals.pickup.free', defaultMessage: '' },
})

interface Props {
  attachmentsInfo: Attachment[]
  bundleInfo: Bundle[]
  currency: string
}

const ProductAttachment: FunctionComponent<Props & InjectedIntlProps> = ({
  bundleInfo,
  attachmentsInfo,
  currency,
  intl,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Fragment>
      {bundleInfo &&
        bundleInfo.map(bundleItem => {
          const hasAttachments =
            bundleItem.attachments && bundleItem.attachments.length > 0
          const isMessage =
            hasAttachments && bundleItem.attachments[0].name === 'message'

          return (
            <article className="bg-muted-5 pv3 ph5 br2 mv4" key={bundleItem.id}>
              <div className="flex justify-between">
                {bundleItem.imageUrl && (
                  <ProductImage
                    url={bundleItem.imageUrl}
                    alt={bundleItem.name}
                  />
                )}
                <p className="c-on-base">{bundleItem.name}</p>
                <div className="flex items-center">
                  <Price value={bundleItem.price} currency={currency} />
                  {hasAttachments && (
                    <div
                      className="c-action-primary ml5"
                      onClick={() => setIsOpen(!isOpen)}>
                      {isOpen ? <IconCaretUp /> : <IconCaretDown />}
                    </div>
                  )}
                </div>
              </div>
              {hasAttachments && (
                <div hidden={!isOpen}>
                  {isMessage && (
                    <p className="c-muted-1">
                      {bundleItem.attachments[0].content.text}
                    </p>
                  )}
                  {!isMessage &&
                    bundleItem.attachments.map(attachmentItem => {
                      Object.keys(attachmentItem.content).map(key => {
                        const contentLabel = key
                        const contentValue = attachmentItem.content[key]
                        return (
                          <p className="c-muted-1" key={key}>
                            {`${contentLabel}: ${contentValue}`}
                          </p>
                        )
                      })
                    })}
                </div>
              )}
            </article>
          )
        })}
      {attachmentsInfo.length > 0 &&
        attachmentsInfo.map(attachmentItem => {
          return isSubscription(attachmentItem) ? (
            <Subscription attachmentItem={attachmentItem} />
          ) : (
            <article
              className="bg-muted-5 pv3 ph5 br2 mv4"
              key={attachmentItem.name}>
              <div className="flex justify-between">
                <p className="c-on-base">{attachmentItem.name}</p>
                <div className="flex items-center">
                  <p className="mr5">{intl.formatMessage(messages.free)}</p>
                  {attachmentItem.content && (
                    <div
                      className="c-action-primary"
                      onClick={() => setIsOpen(!isOpen)}>
                      {isOpen ? <IconCaretUp /> : <IconCaretDown />}
                    </div>
                  )}
                </div>
              </div>
              {attachmentItem.content && (
                <div hidden={!isOpen}>
                  {Object.keys(attachmentItem.content).map(key => {
                    const contentLabel = key
                    const contentValue = attachmentItem.content[key]
                    return (
                      <p className="c-muted-1" key={key}>
                        {`${contentLabel}: ${contentValue}`}
                      </p>
                    )
                  })}
                </div>
              )}
            </article>
          )
        })}
    </Fragment>
  )
}

export default injectIntl(ProductAttachment)
