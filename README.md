# Node.js Cloud Firestore Starter #

### Config - Heroku ###
```bash
heroku config:set CLIENT_EMAIL=<email>
heroku config:set PROJECT_ID=<project id>
heroku config:set SERVICE_KEY=<service key>
```
### Config - Powershell ###
```bash
$env:PRIVATE_KEY = [IO.File]::ReadAllText("<firestore.privatekey.textfile>")
$env:CLIENT_EMAIL = "<firestore service account email>"
$env:PROJECT_ID = "<firestore project id>"
```

### Run ###
- Bash
```bash
npm run build && npm start
```
 - Powershell
```powershell
npm run build ; npm start
```

#### URL
[Local](http://localhost:3000/)