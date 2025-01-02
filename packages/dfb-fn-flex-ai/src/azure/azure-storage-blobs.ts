import { BlobServiceClient, ContainerClient, BlobClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions, SASProtocol } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';

class AzureBlobStorage {
    private endPoint: string;
    private blobServiceClient: BlobServiceClient;

    constructor(endPoint: string) {
        this.endPoint = endPoint;
        this.blobServiceClient = new BlobServiceClient(this.endPoint, new DefaultAzureCredential());
        console.log(`AzureBlobStorage initialized with endpoint: ${this.endPoint}`);

    }
    private initContainerClient(containerName: string): ContainerClient {
        try {

            if (!containerName) throw new Error("Missing credential");

            return this.blobServiceClient.getContainerClient(containerName);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            throw error;
        }

    }
    // private initBlobClient(containerName: string, blobName: string): BlobClient {
    //     const credential = new DefaultAzureCredential();
    //     return new BlobClient(`${this.endPoint}/${containerName}/${blobName}`, credential);
    // }

    // async createBlob(containerName: string, blobName: string, content: string): Promise<number> {

    //     if(!containerName || !blobName || !content) throw new Error("Missing input params");


    //     const containerClient = initContainerClient (containerName);
    //     const containerClient = await this.createContainerIfNotExists(containerName);
    //     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    //     const blockBlobUploadResponse = await blockBlobClient.upload(content, content.length);

    //     return blockBlobUploadResponse._response.status;
    // }

    // async readBlob(containerName: string, blobName: string): Promise<string> {

    //     if(!containerName || !blobName) throw new Error("Missing input params");
    //     const containerClient = await this.createContainerIfNotExists(containerName);

    //     const blobClient = containerClient.getBlobClient(blobName);
    //     const downloadBlockBlobResponse = await blobClient.download();
    //     const downloaded = await this.streamToString(downloadBlockBlobResponse.readableStreamBody);
    //     return downloaded;
    // }

    // async deleteBlob(containerName: string, blobName: string): Promise<number> {

    //     if(!containerName || !blobName) throw new Error("Missing input params");
    //     const containerClient = await this.createContainerIfNotExists(containerName);

    //     const blobClient = containerClient.getBlobClient(blobName);
    //     const deleteBlobResponse = await blobClient.delete();

    //     return deleteBlobResponse._response.status;
    // }

    async generateSasToken(containerName: string, blobName: string, permissions: string = "wc", expiryTimeInMinutes: number = 10): Promise<string> {

        if (!this.endPoint) throw new Error("Missing endpoint");

        if (!containerName || !blobName || !this.endPoint) throw new Error("Missing required params");

        const containerClient = await this.createContainerIfNotExists(containerName);

        const NOW = new Date();
        const expiresOn = this.getFutureDate(NOW, expiryTimeInMinutes);
        const sasCredential:StorageSharedKeyCredential = new StorageSharedKeyCredential(this.blobServiceClient.accountName, process.env.AZURE_BLOB_STORAGE_ACCOUNT_KEY);


        const blobSas = generateBlobSASQueryParameters({
            containerName: containerClient.containerName,
            blobName: blobName,
            permissions: BlobSASPermissions.parse(permissions),
            startsOn: NOW,
            expiresOn,
            protocol: SASProtocol.Https
        }, sasCredential).toString();

        return blobSas;
    }
    private async createContainerIfNotExists(
        containerName: string
    ): Promise<ContainerClient> {

        try {

            if (!containerName) throw new Error("Missing input params");

            const containerClient = this.initContainerClient(containerName);
            console.log(`Creating container client`);

            const exists = await containerClient.exists();
            console.log(`Container exists: ${exists}`);

            if (!exists) {
                await containerClient.create();
                console.log(`Container created ${containerName}`);
            }

            return containerClient;
        } catch (error) {

            console.log(`Error: ${error.message}`);
            throw error;
        };
    }

    // async listBlobsInContainer(containerName: string): Promise<string[]> {

    //     if (!containerName || !containerName) throw new Error("Missing input params");

    //     let returnedBlobUrls = [];
    //     const containerClient = await this.createContainerIfNotExists(containerName);

    //     // get list of blobs in container
    //     // eslint-disable-next-line
    //     for await (const blob of containerClient.listBlobsFlat()) {
    //         console.log(`${blob.name}`);

    //         const blobItem = {
    //             url: `${this.endPoint}/${containerName}/${blob.name}?`,
    //             name: blob.name
    //         }

    //         // if image is public, just construct URL
    //         returnedBlobUrls.push(blobItem);
    //     }

    //     return returnedBlobUrls;
    // };

    private getFutureDate(startTime: Date, minutes: number): Date {
        const DURATION_MINUTES: number = minutes * 60 * 1000;
        const newDate = new Date(startTime.valueOf() + (DURATION_MINUTES));
        console.log(`New date: ${newDate}`);

        return newDate;
    }

    // private async streamToString(readableStream: NodeJS.ReadableStream): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         const chunks: any[] = [];
    //         readableStream.on("data", (data) => {
    //             chunks.push(data.toString());
    //         });
    //         readableStream.on("end", () => {
    //             resolve(chunks.join(""));
    //         });
    //         readableStream.on("error", reject);
    //     });
    // }

}

export default AzureBlobStorage;