import getTextStyling from './getTextStyling'

import React from 'react'

import type { TextBaseProps } from './getTextStyling'

export const H1 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h1
      className={getTextStyling({
        fontSize: 'text-5xl md:text-6xl',
        lineHeight: 'leading-11 md:leading-13',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h1>
  )
}

export const H2 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h2
      className={getTextStyling({
        fontSize: 'text-4xl md:text-5xl',
        lineHeight: 'leading-11 md:leading-12',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h2>
  )
}

export const H3 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h3
      className={getTextStyling({
        fontSize: 'text-3xl md:text-4xl',
        lineHeight: 'leading-10 md:leading-11',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h3>
  )
}

export const H4 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h4
      className={getTextStyling({
        fontSize: 'text-2xl md:text-3xl',
        lineHeight: 'leading-9 md:leading-10',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h4>
  )
}

export const H5 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h5
      className={getTextStyling({
        fontSize: 'text-xl md:text-2xl',
        lineHeight: 'leading-8 md:leading-9',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h5>
  )
}

export const H6 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <h6
      className={getTextStyling({
        fontSize: 'text-lg md:text-xl',
        lineHeight: 'leading-7 md:leading-8',
        fontWeight: 'font-bold',
        ...props,
      })}
      id={id}
    >
      {children}
    </h6>
  )
}

export const B1 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-base md:text-lg',
        lineHeight: 'leading-6 md:leading-7',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export const B2 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-sm md:text-base',
        lineHeight: 'leading-5 md:leading-6',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export const B3 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-2xs md:text-sm',
        lineHeight: 'leading-4 md:leading-5',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export const B4 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-3xs md:text-2xs',
        lineHeight: 'leading-3 md:leading-4',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export const B5 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-4xs md:text-3xs',
        lineHeight: 'leading-2 md:leading-3',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export const B6 = ({
  children,
  id,
  ...props
}: React.PropsWithChildren<TextBaseProps>) => {
  return (
    <p
      className={getTextStyling({
        fontSize: 'text-4xs',
        lineHeight: 'leading-1 md:leading-2',
        fontWeight: 'font-normal',
        ...props,
      })}
      id={id}
    >
      {children}
    </p>
  )
}

export type { TextBaseProps }
