[![Build & Deploy BACKEND on Azure](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-backend-azure.yml/badge.svg)](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-backend-azure.yml)

[![Build & Deploy UI on Azure](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-azure.yml/badge.svg)](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-azure.yml)
[![Build & Deploy UI on Github Pages](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml/badge.svg)](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-ui-ghpages.yml)

# Home Expenses App

## Table of contents

- [Documentation](#documentation)
- [Quick Start](#quick-start)
- [Development](#development)
    - [Local Setup](#local-setup)
      - [Backend](#backend)
    - [Certificates](#certificates)
    - [Testing](#testing)

---

### Documentation

### Quick start

### Development

#### Local Setup
##### Backend
1. Install java 17
2. Set environment variable JAVA_HOME to java folder (Example for Windows: C:\Program Files\Java\jdk-17)
3. Add %JAVA_HOME\bin to PATH variable
4. For local running use the command `./gradlew bootRun` and check url: `localhost:8080/api`
5. For deploying app to Azure use Azure CLI:
   - Install Azure CLI using the following link: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows
   `az -v` for checking version
   `az login` 
   `./gradlew azureWebAppDeploy` from `code/backend/home-expenses-service` folder
   - OR just push new change to `main` branch for triggering [Build & Deploy BACKEND on Azure](https://github.com/home-expenses-github-username/home-expenses/actions/workflows/build-backend-azure.yml)
   - and check url `https://home-expenses-backend.azurewebsites.net/api`

##### Frontend
1. 


#### Certificates

#### Testing





