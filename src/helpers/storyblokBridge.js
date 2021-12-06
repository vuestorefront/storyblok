const createStoryblokBridge = (content, events, relations) => {
  if (window) {
    // eslint-disable-next-line
    const instance = new StoryblokBridge({
      resolveRelations: relations,
    });
    instance.on(events, (payload) => {
      content.content = {
        ...payload.story.content,
        _meta: payload.story,
      };
    });
  }
};

export const storyblokBridge = (
  content = { content: {} },
  events = ['change', 'input'],
  relations = [],
) => {
  const isInsideStoryblokPreview = window.location.ancestorOrigins.contains('http://app.storyblok.com');
  if (!isInsideStoryblokPreview) return

  const existingScript = document.getElementById("storyblokBridge");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "//app.storyblok.com/f/storyblok-v2-latest.js";
    script.id = "storyblokBridge";
    document.body.appendChild(script);
    script.onload = () => {
      createStoryblokBridge(content, events, relations);
    };
  } else {
      createStoryblokBridge(content, events, relations);
  }
}
