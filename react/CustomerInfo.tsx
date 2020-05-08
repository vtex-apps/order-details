import React, { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { ProfileRules, ProfileSummary } from 'vtex.profile-form'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'customerInfoListContainer',
  'customerInfoListName',
  'customerInfoListEmail',
  'customerInfoListDocument',
  'customerInfoListPhone'
] as const

interface Props {
  profile: ClientProfile
}

const CustomerInfo: FunctionComponent<Props & InjectedIntlProps> = ({
  profile,
  intl,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className="flex flex-column c-on-base">
      <ProfileRules country={intl.locale} shouldUseIOFetching>
        <ProfileSummary profile={profile}>
          {({ personalData }: any) => (
            <ul className={`${handles.customerInfoListContainer} list pl0`}>
              <li className={`${handles.customerInfoListName} pv2`}>
                {`${personalData.firstName.value} ${
                  personalData.lastName.value
                }`}
              </li>
              <li className={`${handles.customerInfoListEmail} pv2 c-muted-2`}>
                {personalData.email.value}
              </li>
              {personalData.document && (
                <li
                  className={`${
                    handles.customerInfoListDocument
                  } pv2 c-muted-2`}>
                  {personalData.document.value}
                </li>
              )}
              {profile.phone && (
                <li
                  className={`${handles.customerInfoListPhone} pv2 c-muted-2`}>
                  {profile.phone}
                </li>
              )}
            </ul>
          )}
        </ProfileSummary>
      </ProfileRules>
    </div>
  )
}

export default injectIntl(CustomerInfo)
