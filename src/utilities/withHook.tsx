import React, { ComponentType } from 'react'

interface WithHookProps<TProps> {
  component: ComponentType<TProps>
  hook: (props: TProps) => any
}

export const withHook = <TProps extends Record<string, any>>({
  component: Component,
  hook,
}: WithHookProps<TProps>) => {
  const WrappedComponent = React.forwardRef(
    (props: TProps, ref: React.Ref<any>) => {
      return <Component {...hook(props)} ref={ref} />
    },
  )

  WrappedComponent.displayName = `withHook(${
    Component.displayName || Component.name
  })`

  return WrappedComponent
}
