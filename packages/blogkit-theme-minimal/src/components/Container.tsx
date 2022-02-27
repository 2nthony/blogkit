import { ComponentProps } from 'react'
export function Container(props: ComponentProps<any>) {
  return (
    <div className="page-container mx-auto mt-24 max-w-2xl px-4 md:px-2">
      {props.children}
    </div>
  )
}
