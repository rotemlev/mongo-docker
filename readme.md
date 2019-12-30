# Cybereason DevOps test

## Rotem Levi

The solution contains the following:

- __seed/__: the container that will seed the mongo and includes a seeding script (`mongo-script.js`) and the data downloaded from the test repository (`data.txt`). the bash file (`import.sh`) is there to execute the commands
- __web/__: A node.js container with a simple express web app and a mongo client connector to return a sorted, formated and masked list of items from the mongo
- `docker-compose.yml`: contains 3 containers:
  - mongo-test: mongo version 4.0.4
  - seed: container from `seed` for executing the seeding of data
  - web-app: container from `web` for serving http calls that return the mongo data
- `start.sh`: the launch script which will:
  - start the docker compose in silent mode
  - execute a bash command against the mongo container for extracting the data and storing it to `./exported.json `
    - __Note:__ I was not sure whether the exported data should be raw, or if it too should be masked and sorted. the script contains 2 versions with the latter commented out

execute `$: ./start.sh` and the script will launch the mongo on port `27017` and a website on port `8080`.
in addition it will create a file name `exported.json` containing the exported data from the mongo