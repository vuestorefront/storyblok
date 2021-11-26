import { IntegrationContext } from '@vue-storefront/core'
import { ContentSearchParams, DatasourceEntriesParams } from './types'

declare module '@vue-storefront/core' {
  export interface Context {
    $sb: IntegrationContext<
      any,
      ContentSearchParams,
      {
        getContent: (params: ContentSearchParams) => void
        getDatasourceEntries: (params: DatasourceEntriesParams) => void
      }
    >
  }
}
