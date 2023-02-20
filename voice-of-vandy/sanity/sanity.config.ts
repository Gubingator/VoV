import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision' // npm install @sanity/vision
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'vov',

  projectId: '3gw0ul7p',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
