const { GoogleGenerativeAI, GoogleAIFileManager } = require("@google/generative-ai");

export default class GeminiService {

    protected fileManager: any;
    protected model: any;
    protected image: string;

    constructor() {

        this.fileManager = new GoogleAIFileManager(process.env.API_KEY);

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);

        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", });
    }


    setImage(image: string){
        this.image = image;
    }

    async run() {
       
        const uploadResponse = await this.fileManager.uploadFile(this.image, {
            mimeType: "image/jpeg",
            displayName: "Jetpack drawing",
        });


        const result = await this.model.generateContent([
            {
              fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri
              }
            },
            { text: "Describe how this product might be manufactured." },
          ]);


        const response = await result.response;

        const text = response.text();

        console.log(text);

        return text;
    }
}