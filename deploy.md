# Google Cloud Run

## Build & deploy

See https://cloud.google.com/run/docs/deploying#command-line_1

### one-time initialization:
```gcloud auth configure-docker```
gcloud builds submit --tag gcr.io/<project-id>/crypto-alerts```

### build:
```docker build -t crypto-alerts .```
```docker tag crypto-alerts  gcr.io/<project-id>/crypto-alerts```
```docker push gcr.io/<project-id>/crypto-alerts```
  
### deploy (first time and revisions)
```gcloud run deploy crypto-alerts --image gcr.io/<project-id>/crypto-alerts --max-instances 1 --platform managed```
*note max-instance 1 is important here. If we have parallel instances, we will get multiple notifications*
*note use a service like uptime robot to keep that instance alive.*

# set max-instance for existing revision (will make a new revision, since revisions are immutable)
```gcloud run services update crypto-alerts --max-instances 1```

## TODO

Create a YAML file to automate the above *without* including the project-id in git.