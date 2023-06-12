import React, { MouseEventHandler } from 'react'

import { ButtonVariants } from '@/constants'

export interface RoundedButtonProps extends React.PropsWithChildren<{}> {
  type?: 'submit' | 'reset' | 'button' | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: ButtonVariants
  className?: string
  disabled?: boolean
  loading?: boolean
}

export default function useRoundedButton({
  variant = ButtonVariants.PRIMARY,
  disabled = false,
  className,
  children,
  onClick,
  loading,
  type,
}: RoundedButtonProps) {
  return {
    variant,
    disabled,
    className,
    onClick,
    children,
    loading,
    type,
  }
}
