import { z } from "zod";

export const ImageTransformationSchema = z.object({
    title: z.string().min(3).max(100),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
  })

export type ImageTransformationFormValues = z.infer<typeof ImageTransformationSchema>  