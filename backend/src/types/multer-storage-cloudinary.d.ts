declare module 'multer-storage-cloudinary' {
    import { StorageEngine } from 'multer';
    export class CloudinaryStorage implements StorageEngine {
      constructor(options: any);
    }
  }
  