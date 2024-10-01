// app/Traits/ImageUploader.ts
import drive from '@adonisjs/drive/services/main';
import { randomUUID } from 'crypto';
import path from 'path';

export default class ImageUploader
 {
  
  public buffer: any;
  
  public async uploadImageBase64(base64Image: string, pathName: string): Promise<any> {
    
    if (!base64Image) return null

    const disk = drive.use();

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const buffer = Buffer.from(base64Data, 'base64');
    
    const fileName = `${randomUUID()}.jpeg`; 

    const filePath = `${pathName}/${fileName}`;

    await disk.put(`${pathName}/${fileName}`, buffer);
    
    return {
      absolutePath: path.resolve(`storage/${filePath}`),
      relativePath: await disk.getUrl(`${pathName}/${fileName}`),
    };
    
  }
}
