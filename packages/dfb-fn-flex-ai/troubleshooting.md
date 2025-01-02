
## Run Azurite with self-signed credentials

Want to run in devcontainer on Mac M1

For detailed output, run func with --verbose flag.
[2025-01-01T16:37:08.654Z] Executing 'Functions.sastoken' (Reason='This function was programmatically called via the host APIs.', Id=16a7abea-1eaf-43cd-bcc5-98214a40ece9)
[2025-01-01T16:37:08.688Z] AzureBlobStorage initialized with endpoint: https://127.0.0.1:10000/devstoreaccount1
[2025-01-01T16:37:08.710Z] Http function processed request for url "http://localhost:7071/api/sastoken?name=dina"
[2025-01-01T16:37:08.710Z] Blob name: dina
[2025-01-01T16:37:10.863Z] Executed 'Functions.sastoken' (Failed, Id=16a7abea-1eaf-43cd-bcc5-98214a40ece9, Duration=2223ms)
[2025-01-01T16:37:10.863Z] System.Private.CoreLib: Exception while executing function: Functions.sastoken. System.Private.CoreLib: Result: Failure
[2025-01-01T16:37:10.863Z] Exception: self-signed certificate
[2025-01-01T16:37:10.863Z] Stack: RestError: self-signed certificate
[2025-01-01T16:37:10.863Z]     at ClientRequest.<anonymous> (/Users/dina/repos/ai/dfb-fn-flex-ai/node_modules/@azure/core-rest-pipeline/dist/commonjs/nodeHttpClient.js:197:24)
[2025-01-01T16:37:10.863Z]     at Object.onceWrapper (node:events:629:26)
[2025-01-01T16:37:10.863Z]     at ClientRequest.emit (node:events:514:28)
[2025-01-01T16:37:10.863Z]     at TLSSocket.socketErrorListener (node:_http_client:495:9)
[2025-01-01T16:37:10.863Z]     at TLSSocket.emit (node:events:514:28)
[2025-01-01T16:37:10.863Z]     at emitErrorNT (node:internal/streams/destroy:151:8)
[2025-01-01T16:37:10.863Z]     at emitErrorCloseNT (node:internal/streams/destroy:116:3)
[2025-01-01T16:37:10.863Z]     at process.processTicksAndRejections (node:internal/process/task_queues:82:21).

## Create SAS token with DefaultAzureCredential

Contructor docs for StorageSharedKeyCredential requires key, doesn't use DefaultAzureCredential
[StorageSharedKeyCredential](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob/storagesharedkeycredential?view=azure-node-latest#constructor-details)


```
const blobSas = generateBlobSASQueryParameters({
    containerName: containerClient.containerName,
    blobName: blobName,
    permissions: BlobSASPermissions.parse(permissions),
    startsOn: NOW,
    expiresOn,
    protocol: SASProtocol.Https
}, containerClient.credential as StorageSharedKeyCredential).toString();
```

## How do I create a SAS token with a DefaultAzureCredential

Seems to only work with Account key