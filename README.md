# webxr-prezi-demos
Demos for the WebXR meetup presentation

Just serve the folder with any http server, like the simple python one:

```sh
python3 -m http.server
```

Each demo is in a subfolder:

- 01-responsive/
- 02-interactive/
- 03-table-top/
- 04-roomscale/

## Docker:
Build the container
```
docker build -t mrjs:example .
```

Run container with path to your example project. Start with creating certificate. Place this certificate inside your project folder
```
openssl req -x509 -newkey rsa:2048 -passout pass:<WRITE YOUR PASSWORD> -keyout key.pem -out cert.pem -days 365
```

Pass your project as a mount volume, add environment variable `NODE_HTTP_SERVER_SSL_PASSPHRASE` with your password:
```
docker run -it --rm -p 443:8080 -e NODE_HTTP_SERVER_SSL_PASSPHRASE=<pass> -v /path/to/your/webxr-prezi-demos:/app --name mrjs --hostname mrjs mrjs:example
```

Open web page:
```
https://localhost
```
