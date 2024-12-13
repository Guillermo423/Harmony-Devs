// cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

const getCloudinaryInstance = () => {
  return cloudinary;
};

export default getCloudinaryInstance;