/* Typings for `render-runtime` */
declare module 'vtex.render-runtime' {
  import { Component, FunctionComponent, ReactElement } from 'react'

  export interface RenderContextProps {
    runtime: {
      account: string;
    }
  }

  export const Link: FunctionComponent<{
    page?: string;
    params?: any;
    query?: any;
    to?: string;
    scrollOptions?: RenderScrollOptions;
    fallbackToWindowLocation?: boolean;
    replace?: boolean;
  }>
  export const NoSSR: ReactElement
  export const RenderContextConsumer: ReactElement
  export const canUseDOM: boolean
  export const withRuntimeContext: any
}
