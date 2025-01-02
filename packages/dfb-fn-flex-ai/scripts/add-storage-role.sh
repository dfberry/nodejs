#!/bin/bash

# Variables
subscriptionId="<your_subscription_id>"
resourceGroupName="<your_resource_group_name>"
storageAccountName="<your_storage_account_name>"
userPrincipalName="<your_user_principal_name>" # e.g., user@domain.com

# Get the user object ID
userId=$(az ad user show --id $userPrincipalName --query objectId --output tsv)

# Assign the Storage Blob Data Owner role
az role assignment create --assignee $userId --role "Storage Blob Data Owner" --scope "/subscriptions/$subscriptionId/resourceGroups/$resourceGroupName/providers/Microsoft.Storage/storageAccounts/$storageAccountName"

echo "Assigned Storage Blob Data Owner role to $userPrincipalName for storage account $storageAccountName"