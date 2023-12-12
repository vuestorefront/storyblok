declare global {
  interface Window {
    StoryblokBridge: any
  }
}

const { StoryblokBridge } = window

export const storyblokBridge = (
  content = { content: {} },
  events = ['change', 'input'],
  relations = [],
) => {
  if (window) {
    // eslint-disable-next-line
    const instance = new StoryblokBridge({
      resolveRelations: relations,
    })
    instance.on(events, (payload) => {
      content.content = {
        ...payload.story.content,
        _meta: payload.story,
      }
    })
  }
}
