import RoundedButtonView from './RoundedButtonView'
import useRoundedButton, { RoundedButtonProps } from './useRoundedButton'

import React from 'react'

import { withHook } from '@/utilities/withHook'

const RoundedButton: React.FC<RoundedButtonProps> = withHook({
  hook: useRoundedButton,
  component: RoundedButtonView,
})
export default RoundedButton
