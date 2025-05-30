import { defineConfig, presetIcons, presetWind4, transformerDirectives } from 'unocss'

export default defineConfig({
  theme: {
    dark: 'class',
  },
  presets: [presetWind4(), presetIcons()],
  transformers: [transformerDirectives()],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'dot-bg': 'bg-[image:linear-gradient(to_bottom,_#ffffff,_#fafafa),_radial-gradient(#d4d4d8_1px,_transparent_0)] bg-[length:auto,_18px_18px] bg-blend-multiply bg-repeat',
  },
})
