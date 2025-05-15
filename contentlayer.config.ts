// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    coverImage: {
      type: 'string',
      required: true,
    },
    readingTime: {
      type: 'string',
      required: true,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/blog\/?/, ''),
    },
  },
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
})

export default contentLayerConfig
