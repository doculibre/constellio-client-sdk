# constellio-typescript-sdk

Constellio-SDK is a javascript library to help developpers authenticate and query Constellio records easier and also be able to do more advance queries for experts.

## Prerequisite

Users testing this library need to have Constellio active (localhost or remote) with Rest API plugin installed.

Developement environment should have the following technologies installed:

* nodejs and npm -> [https://nodejs.org/](https://nodejs.org/)
* Typescript 
   ```bash
   npm install typescript -g
   ```
     

## Installation

In root project folder open cmd (Windows) or terminal (linux) and install libraries.

```bash
npm install
```

### sample React

In samples folder, in constellio-sample-react
open cmd (Windows) or terminal (linux) and install libraries.
```bash
npm install
```
Our library is installed only privately. When you have a tgz of the project (see "Pack for testing" section of this readme), install it in the sample
```bash
npm install pathTotheZipFile/constellio-sdk-<version>.tgz
```
Change the CONSTELLIO_URL value to your constellio url in src/components/Login.tsx.

start application with
```bash
npm start
```

## Pack for testing

### pack for reactjs
In the project root folder,  
```bash
npm pack
```
There should be a tgz file for your pack available in root folder.

### Pack to js

use following command
```bash
webpack
```

### Using package
```javascript
import {getCollections} from 'constellio-sdk/dist';

const collections = (auth) => {
    return getCollections({auth})
        .then((response) => {
            if (response) {
                console.log(response);
            }
        });
};

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## About Us
[CONSTELLIO](https://constellio.com/en/home)
