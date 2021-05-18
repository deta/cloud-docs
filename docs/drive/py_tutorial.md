---
id: py_tutorial
title: Python Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Building a Simple Image Server with Deta Drive


### Setup
To get started, create a directory `image-server` and change the current directory into it.
```shell
$ mkdir image-server && cd image-server
```
Before we begin, let's install all the necessary dependencies for this project. Create a `requirements.txt` with the following lines:
```json
fastapi
deta
python-multipart
```
We are using `FastAPI` to build our simple image server, and `python-multipart` allows us access the uploaded files. 

Run the following command to install the dependencies.
```shell
$ pip install -r requirements.txt
```

To configure the app, import the dependencies and instantiate drive in `main.py`

```python
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse, StreamingResponse
from deta import Deta

app = FastAPI()
deta = Deta("Project_Key")  # configure your Deta project 
drive = deta.Drive("images") # access to your drive
```

We have everything we need to 🚀

### Uploading Images 
First, we need to render a HTML snippet to display the file upload interface.

We'll expose a function that renders the HTML snippet on the base route `/`
```python
@app.get("/", response_class=HTMLResponse)
def render():
    return """
    <form action="/upload" enctype="multipart/form-data" method="post">
        <input name="file" type="file">
        <input type="submit">
    </form>
    """
```

We are simply rendering a form that sends a HTTP `POST` request to the route `/upload` with file data.

Let's complete file upload by creating a function to handle `/upload`

```python
@app.post("/upload")
def upload_img(file: UploadFile = File(...)):
    name = file.filename
    f = file.file
    res = drive.put(name, f)
    return res
```

Thanks to the amazing tools from FastAPI, we can simply wrap the input around `UploadFile` and `File` to access the image data. We can retrieve the name as well as bytes from `file` and store it in Drive. 

#### Request

```json
curl -X 'POST' \
  'http://127.0.0.1:8000/upload' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@space.png;type=image/png'
```

#### Response

```json
"space.png"
```


### Downloading Images
To download images, we can simply use `drive.get(name)`

If we tie a `GET` request to the `/download` path with a param giving a name (i.e `/download/space.png`), we can return the image over HTTP.
```python
@app.get("/download/{name}")
def download_img(name: str):
    res = drive.get(name)
    return StreamingResponse(res.iter_chunks(1024), media_type="image/png")
```

You can learn more about `StreamingResponse` [here](https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse).

#### Request
Let's try downloading the image that we just uploaded.

Make a `GET` request to the path (for example `/download/space.png`)

```json
curl -X 'GET' \
  'http://127.0.0.1:8000/download/space.png' \
  -H 'accept: application/json'
```

#### Response
The server should return a response with the image.
