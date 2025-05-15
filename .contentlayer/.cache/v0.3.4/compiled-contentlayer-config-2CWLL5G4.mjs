// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "string",
      required: true
    },
    excerpt: {
      type: "string",
      required: true
    },
    category: {
      type: "string",
      required: true
    },
    coverImage: {
      type: "string",
      required: true
    },
    readingTime: {
      type: "string",
      required: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/blog\/?/, "")
    }
  }
}));
var contentLayerConfig = makeSource({
  contentDirPath: "content",
  documentTypes: [Post]
});
var contentlayer_config_default = contentLayerConfig;
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-2CWLL5G4.mjs.map
