import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string', // or image? - doesnt seem to work
    }),
    defineField({
      name: 'audio',
      title: 'Comment Audio',
      type: 'file',
    }),
  
    defineField({
      name: 'tweet',
      title: 'Tweet',
      description: 'Reference the Tweet the comment is associated to:',
      type: 'reference',
      to: {
        type:'tweet'
      }
    }),

  ],
})
