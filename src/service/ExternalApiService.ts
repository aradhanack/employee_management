import axios from 'axios';

export class ExternalApiService {
  async sendXMLToExternalAPI(xmlData: string): Promise<any> {
    try {
      console.log("Entered sendXMLToExternalAPI");
      const apiUrl = 'http://localhost:5000/user/';
      console.log("xml data that reached sendXMLToExternalAPI", xmlData)
      const response = await axios.post(apiUrl, xmlData, {
        headers: {
          'Content-Type': 'application/xml',
        },

      });
      console.log("response got from external api in method :", response.data);
      return response.data;

    } catch (error) {
      console.error('Error sending XML to external API:', error);
    }
  }
}
