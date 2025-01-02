import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import AzureBlobStorage from '../azure/azure-storage-blobs';

function createRandomString(length: number): string {
    console.log(`Fn Fn 1 Creating random string of length ${length}`);
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(`Fn Fn 2 Random string: ${result}`);
    return result;
}

interface sasTokenResponse {
    containerName: string;
    blobName: string;
    sasToken: string;
}

export async function getSasToken(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Fn 1 Http function processed request for url "${request.url}"`);

    const blobName = await request.query.get('name') || await request.text();
    context.log(`Fn 2 - Blob name: ${blobName}`);

    try{
        if (!blobName) {
            return {
                status: 400,
                body: 'Provide a blob name in the query string or request body.'
            };
        } else {
    
            const randomContainerName = createRandomString(10);
            console.log(`Fn 3 Random container name: ${randomContainerName}`);
    
            const azureBlobStorage = new AzureBlobStorage(process.env.AZURE_BLOB_STORAGE_ENDPOINT);
            const sasToken = await azureBlobStorage.generateSasToken(randomContainerName, blobName);
            
            return {
                status: 200,
                jsonBody: {
                    containerName: randomContainerName,
                    blobName: blobName,
                    sasToken: sasToken
                }
            };
        }
    } catch (error) {
        return {
            status: 500,
            body: error.message + error.stack
        };
    }


};  

app.http('sastoken', {
    route: 'sastoken',
    methods: ['GET'],
    authLevel: 'function',
    handler: getSasToken
});
