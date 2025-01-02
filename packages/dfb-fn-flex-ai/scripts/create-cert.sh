#!/bin/bash

# Define the certificate file names
CERT_NAME="mycert"
CERT_FILE="${CERT_NAME}.pem"
KEY_FILE="${CERT_NAME}-key.pem"

# Generate a new private key and certificate
openssl req -x509 -newkey rsa:4096 -keyout $KEY_FILE -out $CERT_FILE -days 365 -nodes -subj "/CN=localhost"

# Output the result
echo "Generated $CERT_FILE and $KEY_FILE for Azurite."