import {readFile, writeFile} from "fs";
import jsontoxml from "jsontoxml";
import {promisify} from "util";
import {ApplicationConfig, EmployeeApplication} from './application';

import * as amqp from 'amqplib';
import * as fs from "fs";
import {ExternalApiService} from './service/ExternalApiService';


export * from './application';

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);



export async function main(options: ApplicationConfig = {}) {
  const app = new EmployeeApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });



  (async function convertJsonToXml() {
    console.log("Entered function convertJsonToXml");
    const staticSiteGenerationData = JSON.parse(
      await readFilePromise("./data/db.json", "utf8")) /*as {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        address: string;
      }[]*/;
    var myData = Object.keys(staticSiteGenerationData.models.Employee).map((key) => {
      console.log(key);
      return key;

    })
    console.log("mydata:" + myData);
    console.log("json data:" + staticSiteGenerationData.models.Employee["1"]);


    const staticSiteGeneratorXmlString = jsontoxml(staticSiteGenerationData.models.Employee);

    console.log("xml data " + staticSiteGeneratorXmlString);
    await writeFilePromise("./data/data.xml", staticSiteGeneratorXmlString, "utf8");
  })();

  (async function sendMessage() {
    try {
      console.log("Entered function sendMessage");
      const xmlData = fs.readFileSync("./data/data.xml", "utf8");
      const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
      console.log("connection made");
      const channel = await connection.createChannel();
      console.log("channel created");
      const queueName = 'myQueue';
      const msg = 'Hi';

      await channel.assertQueue(queueName, {durable: false});
      console.log("queue made");
      channel.sendToQueue(queueName, Buffer.from(msg));
      console.log("message sent to queue");
      channel.sendToQueue(queueName, Buffer.from(xmlData));
      console.log("xml send to the queue");

      setTimeout(() => {
        channel.close();
        connection.close();
      }, 500);
    }
    catch (error) {
      console.log("Error sending the message:", error);
    }
  })();

  (async function sendAPIresult() {
    console.log("Entered function sendAPIresult");
    const externalApiService = new ExternalApiService();

    const xmlData = fs.readFileSync("./data/data.xml", "utf8");

    externalApiService.sendXMLToExternalAPI(xmlData).then(
      response => {
        console.log("Response from external api: ", response);
      })
      .catch(error => {
        console.error("Error sending XML:", error);
      });
  })();

}



