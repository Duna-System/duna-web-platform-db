# duna-web-platform-db

This repository serves to support Duna database.

## Check and Deployment

-   `npm run build`

## Usage

In your application, simply add this repository:

`npm install https://github.com/Duna-System/duna-web-platform-db.git`.

To install a specific branch, use

`npm install https://github.com/Duna-System/duna-web-platform-db.git#branch-name`.

It is also possible to install a local branch by setting the corresponding package PATH to the
`build` folder of the dependency and call `npm install`.

Then include the error definitions. Example:

-   `import {  connectToDatabase } from 'duna-web-platform-db`
