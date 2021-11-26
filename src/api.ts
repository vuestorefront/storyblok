import {
  ApiContext,
  ApiContextConfig,
  ApiResponse,
  ContentSearchParams,
  DatasourceEntriesParams,
  DatasourceEntriesResponse,
  IStoryblok,
} from './types'
import Storyblok from 'storyblok-js-client'

import { Logger } from '@vue-storefront/core'
import { nanoid } from 'nanoid'
import { errorMessage } from './helpers/constants'
import { extractNestedComponents } from './helpers'

const instantiateClient = (client: IStoryblok, config: ApiContextConfig): Storyblok => {
  const { token, cacheProvider } = config
  return new client({
    accessToken: token,
    cache: {
      clear: 'auto',
      type: cacheProvider,
    },
  })
}

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
  if (!id && custom && typeof custom !== 'object') {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.WRONG_CUSTOM}`)
  }

  const Storyblok = instantiateClient(client, config);
  const resolveCustomSearch = id ? { by_uuids_ordered: id } : custom || {}

  try {
    const { data }: { data: ApiResponse } = await Storyblok.get(
      `cdn/stories/${id || custom ? '' : url}`,
      {
        ...((!cache ? { cv: nanoid() } : {}) as any),
        ...resolveCustomSearch,
        resolve_relations: relations,
        language: locale,
        version,
      },
    )
    return data.story
      ? extractNestedComponents(data.story)
      : extractNestedComponents({ content: data.stories }, true) || []
  } catch (error) {
    Logger.warn(`${errorMessage.GENERAL}`, error)
    return []
  }
}

export const getDatasourceEntries = async (
  { client, config }: ApiContext,
  { slug, dimension, cache, page, per_page }: DatasourceEntriesParams,
): Promise<[] | void | {}> => {
  if (!slug) {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.EMPTY_DATASOURCE}`)
  }

  const Storyblok = instantiateClient(client, config);

  try {
    const { data }: { data: DatasourceEntriesResponse } = await Storyblok.get(
      `cdn/datasource_entries/`,
      {
        datasource: slug,
        dimension,
        page,
        per_page,
        ...((!cache ? { cv: nanoid() } : {}) as any),
      },
    )
    return data.datasource_entries
  } catch (error) {
    Logger.warn(`${errorMessage.GENERAL}`, error)
    return []
  }
}
