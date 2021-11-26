import { useContentFactory, UseContent, Context } from '@vue-storefront/core'
import { DatasourceEntriesParams } from '../types'

const search = async (
  context: Context,
  params: DatasourceEntriesParams,
): Promise<any> => {
  return context.$sb.api.getDatasourceEntries(params)
}
const useDatasource: (cacheId: string) => UseContent<any, DatasourceEntriesParams> =
  useContentFactory<any, DatasourceEntriesParams>({ search })

export { useDatasource }
