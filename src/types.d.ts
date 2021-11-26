import Storyblok, { StoryblokCache, StoryblokConfig } from 'storyblok-js-client'

export interface IStoryblok {
  new(config: StoryblokConfig): Storyblok;
}
export interface ApiContextConfig {
  token: string
  cacheProvider?: 'memory'
}
export interface ApiContext {
  client: IStoryblok
  config: ApiContextConfig
}

export interface ContentSearchParams extends ApiContextConfig {
  cache?: boolean
  version?: Version
  id?: string
  url?: string
  custom?: {} | CustomSearch
  locale?: string
  relations?: string
}
export type Version = 'draft' | 'published'
export interface CustomSearch {
  field: string
  value: string
}
export interface Content {
  content: any
  component: string
}
export interface ApiResponse {
  story?: Content
  stories?: Content[]
  cv: string
  rels: {}[]
  links: {}[]
}
export interface Component {
  _editable?: {}
  component: string
}
export interface Image {
  image: string
}

export interface DatasourceEntriesParams extends ApiContextConfig {
  cache?: boolean
  slug: string
  dimension?: string
  page?: number
  per_page?: number
}

export interface DatasourceEntry {
  id: String
  name: String
  value: String
  dimension_value?: String
}

export interface DatasourceEntriesResponse {
  datasource_entries?: DatasourceEntry[]
}