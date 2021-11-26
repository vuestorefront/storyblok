import { ApiContext, ApiResponse, ContentSearchParams } from './types'
import { Logger } from '@vue-storefront/core'
import { nanoid } from 'nanoid'
import { errorMessage } from './helpers/constants'
import { extractNestedComponents } from './helpers'

export const getContent = async (
  { client, config }: ApiContext,
  {
    id,
    url,
    custom,
    cache = true,
    locale,
    relations,
    version = 'published',
  }: ContentSearchParams,
): Promise<[] | void | {}> => {
  if (!url && !id && !custom) {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.EMPTY_ID}`)
  }
  const { token, cacheProvider } = config
  const Storyblok = new client({
    accessToken: token,
    cache: {
      clear: 'auto',
      type: cacheProvider,
    },
  })
  const resolveCustomSearch = id ? { by_uuids_ordered: id } : custom || {}
  if (!id && custom && typeof custom !== 'object') {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.WRONG_CUSTOM}`)
  }
  try {
    const { data, perPage, total }: { data: ApiResponse, perPage: number, total: number } = await Storyblok.get(
      `cdn/stories/${id || custom ? '' : url}`,
      {
        ...((!cache ? { cv: nanoid() } : {}) as any),
        ...resolveCustomSearch,
        resolve_relations: relations,
        language: locale,
        version,
      },
    )
    const extractedComponents = data.story
      ? extractNestedComponents(data.story)
      : extractNestedComponents({ content: data.stories }, true)

    if (perPage !== undefined)
      (extractedComponents as Record<string, any>).perPage = perPage
    if (total !== undefined)
      (extractedComponents as Record<string, any>).total = total
    return extractedComponents
  } catch (error) {
    Logger.warn(`${errorMessage.GENERAL}`, error)
    return []
  }
}
