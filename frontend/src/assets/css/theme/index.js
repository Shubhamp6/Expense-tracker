import { tableCellClasses } from '@mui/material'
import { createTheme } from '@mui/material'
import breakPoint from './breakpoint'
import colorTheme from './colorTheme'

import applyCustomTypoGraphy from './typography'

const theme = createTheme({
  ...breakPoint,
  ...colorTheme,
  
  shape: {
    borderRadius: 6
  },
  spacing: [0, 4, 8, 16, 24, 32, 48]
})

export default applyCustomTypoGraphy(theme)
