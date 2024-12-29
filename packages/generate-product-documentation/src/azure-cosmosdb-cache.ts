import {
    AzureCosmosDBNoSQLConfig,
    AzureCosmosDBNoSQLSemanticCache,
  } from "@langchain/azure-cosmosdb";
  import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
  
  import 'dotenv/config'

  const embeddings = new OpenAIEmbeddings();
  const config: AzureCosmosDBNoSQLConfig = {
    databaseName: process.env.AZURE_COSMOSDB_DATABASE_NAME || "<DATABASE_NAME>",
    containerName: process.env.AZURE_COSMOSDB_CONTAINER_NAME || "<CONTAINER_NAME>",
    // use endpoint to initiate client with managed identity
    connectionString: process.env.AZURE_COSMOSDB_CONNECTION_STRING || "<CONNECTION_STRING>",
};
  
  /**
   * Sets the threshold similarity score for returning cached results based on vector distance.
   * Cached output is returned only if the similarity score meets or exceeds this threshold;
   * otherwise, a new result is generated. Default is 0.6, adjustable via the constructor
   * to suit various distance functions and use cases.
   * (see: https://aka.ms/CosmosVectorSearch).
   */
  
  const similarityScoreThreshold = 0.5;
  const cache = new AzureCosmosDBNoSQLSemanticCache(
    embeddings,
    config,
    similarityScoreThreshold
  );
  
  const model = new ChatOpenAI({ cache });
  
  // Invoke the model to perform an action
  const response1 = await model.invoke("Do something random!");
  console.log(response1);
  /*
    AIMessage {
      content: "Sure! I'll generate a random number for you: 37",
      additional_kwargs: {}
    }
  */
  
  const response2 = await model.invoke("Do something random!");
  console.log(response2);
  /*
    AIMessage {
      content: "Sure! I'll generate a random number for you: 37",
      additional_kwargs: {}
    }
  */
  