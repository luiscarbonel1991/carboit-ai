declare type AddImageParams = {
    image: {
      title: string;
      publicId: string;
      transformationType: string;
      width: number;
      height: number;
      config: any;
      secureURL: string;
      transformationURL: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };
  
  declare type UpdateImageParams = {
    image: {
      _id: string;
      title: string;
      publicId: string;
      transformationType: string;
      width: number;
      height: number;
      config: any;
      secureURL: string;
      transformationURL: string;
      aspectRatio: string | undefined;
      prompt: string | undefined;
      color: string | undefined;
    };
    userId: string;
    path: string;
  };
  