import { v2 as cloudinary } from 'cloudinary'

export default class DeleteFile {

    deleteFile = async (data: any) => {
        try {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                await cloudinary.uploader.destroy(element)
            }
            return true
        } catch (error: any) {
            console.log(error);
            return error
        }
    }
}