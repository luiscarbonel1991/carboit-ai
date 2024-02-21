import { ImagesIcon } from "lucide-react";


export const imageTransformationTypes = {
    restore: {
        type: "restore",
        title: "Restore Image",
        subTitle: "Refine images by removing noise and imperfections",
        config: { restore: true },
        icon: ImagesIcon,
      },
      removeBackground: {
        type: "removeBackground",
        title: "Background Remove",
        subTitle: "Removes the background of the image using AI",
        config: { removeBackground: true },
        icon: ImagesIcon,
      },
      fill: {
        type: "fill",
        title: "Generative Fill",
        subTitle: "Enhance an image's dimensions using AI outpainting",
        config: { fillBackground: true },
        icon: ImagesIcon,
      },
      remove: {
        type: "remove",
        title: "Object Remove",
        subTitle: "Identify and eliminate objects from images",
        config: {
          remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: ImagesIcon,
      },
      recolor: {
        type: "recolor",
        title: "Object Recolor",
        subTitle: "Identify and recolor objects from the image",
        config: {
          recolor: { prompt: "", to: "", multiple: true },
        },
        icon: ImagesIcon,
      },
}