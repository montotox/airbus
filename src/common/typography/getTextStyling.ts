import classNames from 'classnames'

export interface TextBaseProps {
  lineHeight?: string
  fontWeight?: string
  fontFamily?: string
  className?: string
  underline?: boolean
  textAlign?: string
  fontSize?: string
  padding?: string
  margin?: string
  color?: string
  id?: string
}

const getTextStyling = ({
  lineHeight,
  fontWeight,
  fontFamily,
  className,
  underline,
  textAlign,
  fontSize,
  padding,
  margin,
  color,
}: TextBaseProps) => {
  const textClass = classNames(
    fontSize ? { [fontSize]: fontSize } : 'text-base',
    lineHeight ? { [lineHeight]: lineHeight } : '',
    fontWeight ? { [fontWeight]: fontWeight } : '',
    color ? { [color]: color } : 'text-black',
    {
      ...(margin && { [margin]: margin }),
      ...(padding && { [padding]: padding }),
      ...(fontFamily && { [fontFamily]: fontFamily }),
      ...(textAlign && { [textAlign]: textAlign }),
      'underline underline-offset-4': underline,
    },
    className,
  )

  return textClass
}

export default getTextStyling
