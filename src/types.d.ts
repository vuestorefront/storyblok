import Storyblok, { StoryblokConfig } from 'storyblok-js-client'

export interface StoryblokClient {
  new(config: StoryblokConfig): Storyblok;
}
export interface ApiContextConfig {
  token: string
  cacheProvider?: 'memory'
}
export interface ApiContext {
  client: StoryblokClient
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

export interface DatasourceParams extends ApiContextConfig {
  cache?: boolean
  slug: string
  dimension?: string
  page?: number
  perPage?: number
}
export interface Datasource {
  id: String
  name: String
  value: String
  dimension?: String
}
export interface DatasourceResponse {
  datasource_entries?: Datasource[]
}
