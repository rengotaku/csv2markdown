//theme.ts
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#C6F6D5',
      },
      html: {
       height: '100%'
     }
    }
  }
});