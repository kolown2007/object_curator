
import '@auth/core/types'

declare module '@auth/core/types' {
  interface User {
    permissions?: string[]
    // ...other existing properties remain unchanged...
  }
}