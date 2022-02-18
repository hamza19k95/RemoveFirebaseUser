# Remove Firebase User

## Installation

Use the package manager Node.

```bash
npm install
```

## Usage

You Can Create a new Key under your firebase project setting > Service accounts and Generate a new private key.
Store that JSON file under the Db folder.
Also, copy your database URL

```Add Creds under Db Folder
const serviceAccount = require("./flush-66fa7-firebase-adminsdk-oy65x-5860559933.json");
const dbURL = "https://flush-66fa7-default-rtdb.firebaseio.com"
```

## Run Project

```
npm start
```
