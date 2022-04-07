import { useContentFactory, UseContent, Context } from '@vue-storefront/core'
import { DatasourceParams } from '../types'

const search = async (
  context: Context,
  params: DatasourceParams,
): Promise<any> => {
  return context.$sb.api.getDatasourceEntries(params)
}
const useDatasource: (cacheId: string) => UseContent<any, DatasourceParams> =
  useContentFactory<any, DatasourceParams>({ search })

export { useDatasource }
