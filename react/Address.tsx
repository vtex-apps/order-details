import React, { FunctionComponent } from 'react'
import { AddressRules, AddressSummary } from 'vtex.address-form'
import { useCssHandles } from 'vtex.css-handles'

interface Props {
  address: Address
  pickup?: Parcel
}

const CSS_HANDLES = [
  'addressContainer',
  'pickupFriendlyName'
] as const

const Address: FunctionComponent<Props> = ({ address, pickup }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles.addressContainer} c-muted-1 lh-copy`} data-testid="address-component">
      {pickup && (
        <p className={`${handles.pickupFriendlyName} c-on-base lh-copy`}>{pickup.pickupFriendlyName}</p>
      )}
      <AddressRules country={address.country} shouldUseIOFetching>
        <AddressSummary address={address} />
      </AddressRules>
    </div>
  )
}

export default Address
