require("dotenv").config();
const { execSync } = require("child_process");
const projectId = process.env.GCLOUD_PROJECT_ID;
const projectName = 'crypto-alerts';

console.log("Deploying " + projectName + " to " + projectId + "\n\n");

const commands = [
    "docker build -t " + projectName + " .",
    "docker tag " + projectName + " gcr.io/" + projectId + "/" + projectName,
    "docker push gcr.io/" + projectId + "/" + projectName,
    "gcloud run deploy " + projectName + " --image gcr.io/" + projectId + "/" + projectName + " --max-instances 1 --platform managed"
];

try {
    for(let command of commands) {
        execSync(command, {
            cwd: '.',
            stdio: 'inherit',
            encoding: 'utf8'
        });
    }
}
catch(ex) {
    process.stdout.write(ex.stderr); 
    process.stdout.write(`\n`); 
}