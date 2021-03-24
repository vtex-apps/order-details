import React, { FunctionComponent, ReactChild, ReactNode } from 'react'
import { Link } from 'vtex.render-runtime'
import { Button, ButtonWithIcon } from 'vtex.styleguide'

interface Props {
  to: string
  icon?: ReactNode
  fullWidth?: boolean
  openNewWindow?: boolean
  variation: string
  children: ReactChild
  className?: string
}

const ButtonLink: FunctionComponent<Props> = ({
  to,
  icon,
  fullWidth,
  variation,
  children,
  className
}) => (
  <Link className={className} to={to} data-testid="button-link">
    {icon ? (
      <ButtonWithIcon icon={icon} variation={variation} block={fullWidth}>
        {children}
      </ButtonWithIcon>
    ) : (
      <Button variation={variation} block={fullWidth}>
        {children}
      </Button>
    )}
  </Link>
)

export default ButtonLink
