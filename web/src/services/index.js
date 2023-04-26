import axios from 'axios'
import { QueryClient } from 'react-query'
import * as z from 'zod'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const queryClient = new QueryClient()

const wallSchema = z.object({
  width: z.number().positive().min(1).max(50),
  height: z.number().positive().min(1).max(50),
  quantityOfWindows: z.number().positive().optional(),
  quantityOfDoors: z.number().positive().optional(),
})

const wallsSchema = z.array(wallSchema)

export const suggestWallPaintCans = async ({ walls }) => {
  const result = wallsSchema.safeParse(walls)

  if (result.success) {
    const { data } = await api.post('/paints/suggest-wall-paint-cans', {
      walls,
    })

    return data
  }

  throw new Error(result.error)
}
