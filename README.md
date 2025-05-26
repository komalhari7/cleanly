
# Cleanly - AI Powered Waste Detection Web App

Cleanly is a Next.js web application leveraging Yolov11 (object detection model) trained on custom dataset. It is trained on 18 class of wastes: 
Aluminium foil,
Bottle cap,
Bottle,
Broken glass,
Can,
Carton,
Cigarette,
Cup,
Lid,
Other litter,
Other plastic,
Paper,
Plastic bag - wrapper,
Plastic container,
Pop tab,
Straw,
Styrofoam piece,
Unlabeled litter.

# Run Locally


## Installation


Clone the project

```bash
  git clone https://github.com/komalhari7/cleanly
```

Go to the project directory

```bash
  cd cleanly
```

Install dependencies

```bash
  npm install
```


Configure server.mjs

```bash
const port = 3000   //Specify a free port
const ip = "192.168.0.1" //Add your current IP
```

Configure SSL Certificate (For HTTPS & Camera Permission on mobile devices)

```bash
mkdir -p ssl
openssl req -x509 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes
```

Start the server

```bash
  npm run dev
```

Open the web app from android/ios browser

```bash
      https://<IP>:<port>
  eg; https://192.0.0.1
```








## Tech Stack

**Web Framework:**  Next.js

**AI model:** Yolov11s (TensorFlow.js)

