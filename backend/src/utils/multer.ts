import multer, { Multer } from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import getCloudinaryInstance from './cloudinary';

const initializeCloudinaryStorage = async (): Promise<CloudinaryStorage> => {
  const cloudinaryInstance = getCloudinaryInstance();
  await cloudinaryInstance.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return new CloudinaryStorage({
    cloudinary: cloudinaryInstance,
    params: {
      folder: 'instrumentos',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    },
  });
};

const getMulterInstance = async (): Promise<Multer> => {
  try {
    const storage = await initializeCloudinaryStorage();
    return multer({ storage: storage as any });
  } catch (error) {
    console.error("Error initializing Cloudinary storage:", error);
    return multer({}); // Retorna una instancia de multer por defecto si hay un error
  }
};

export default getMulterInstance; // Exporta una promesa que resuelve con la instancia de multer