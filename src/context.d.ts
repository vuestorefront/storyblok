import { IntegrationContext } from '@vue-storefront/core'
import { ContentSearchParams, DatasourceParams } from './types'

declare module '@vue-storefront/core' {
  export interface Context {
    $sb: IntegrationContext<
      any,
      ContentSearchParams,
      {
        getContent: (params: ContentSearchParams) => void
        getDatasourceEntries: (params: DatasourceParams) => void
      }
    >
  }
}
