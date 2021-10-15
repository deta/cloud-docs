---
id: node_tutorial
title: Node Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Building a Simple Image Server with Deta Drive


### Setup
To get started, create a directory `image-server` and change the current directory into it.
```shell
$ mkdir image-server && cd image-server
```
Before we begin, let's install all the necessary dependencies for this project. 

```shell
$ npm install deta express express-fileupload 
```
In this tutorial, we are using `express` to build our server, and `express-fileupload` allows us to access the uploaded file data. 

To configure the app, import the dependencies and instantiate drive in `index.js`

```js
const { Deta } = require("deta");
const express = require("express");
const upload = require("express-fileupload");

const app = express();

app.use(upload());

const deta = Deta("Project_Key");
const drive = deta.Drive("images");
```


We have everything we need to 🚀

### Uploading Images 
First, we need to render a HTML snippet to display the file upload interface.

We'll expose a function that renders the HTML snippet on the base route `/`
```javascript
app.get('/', (req, res) => {
    res.send(`
    <form action="/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="file">
      <input type="submit" value="Upload">
    </form>`);
});
```

We are simply rendering a HTML form that sends a HTTP `POST` request to the route `/upload` with file data.

Let's complete file upload by creating a function to handle `/upload`

```javascript
app.post("/upload", async (req, res) => {
    const name = req.files.file.name;
    const contents = req.files.file.data;
    const img = await drive.put(name, {data: contents});
    res.send(img);
});
```
We can access the image details from `req` and store it in Drive. 

### Downloading Images
To download images, we can simply use `drive.get(name)`

If we tie a `GET` request to the `/download` path with a param giving a name (i.e `/download/space.png`), we can return the image over HTTP.

```javascript
app.get("/download/:name", async (req, res) => {
    const name = req.params.name;
    const img = await drive.get(name);
    const buffer = await img.arrayBuffer();
    res.send(Buffer.from(buffer));
}); 

app.listen(3000);
```

### Running the server
To run the server locally, navigate to the terminal in the project directory (`image-server`) and run the following command:
```shell
$ node index.js
```

<img src="/img/drive/drive-py-tut.png" alt="/"/>
<img src="/img/drive/drive-py-tut-1.png" alt="/download/tut.jpg"/>


```shell
curl -X 'POST' \
  'http://127.0.0.1:3000/upload' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@space.png;type=image/png'

Response 
"space.png"

curl -X 'GET' \
  'http://127.0.0.1:3000/download/space.png' \
  -H 'accept: application/json'

Response 
The server should respond with the image. 
```
