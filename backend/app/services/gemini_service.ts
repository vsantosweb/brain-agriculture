
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export default class GeminiService {

  protected fileManager: any;
  protected model: any;
  protected image?: string | null;

  constructor() {

    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY as string);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", });
  }


  setImage(image?: string | null) {
    this.image = image;
  }

  async run() {

    const uploadResponse = await this.fileManager.uploadFile(this.image, {
      mimeType: "image/jpeg",
      displayName: "Hidrômetro",
    });

    const result = await this.model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri
        }
      },
      { text: "Faça a leitura desse hidrômetro, retorne apenas o resultado em números" },
    ]);

    const response = await result.response;

    const text = response.text();

    console.log(text);

    return text;
  }
}