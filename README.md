# Galactic Spacefarers
The project is containerized with Docker to ensure a consistent environment across all setups.

### 1. Configure environment variables
Update the `.env` file in the project root.  

### 2. Start the application
```docker compose up --build```

Frontend will be available at `http://localhost:5173`

Server will be available at `http://localhost:4004`

* Pages: List (sort/filter/paginate), Create, Edit
* `service GalacticService` exposing projections for all entities
* Mocked auth for local dev
* DB persists in `./db` mount
* Vite app under `spacefarers-react` reads OData from `/odata`
* `GET /odata/v4/galaxy/Spacefarers?$top=5&$count=true` returns rows & `@odata.count`
* `POST /odata/v4/galaxy/Spacefarers` validates ranges and returns created entity
* After create, console shows "cosmic email sent"/ email delivered
* Planet isolation: user A (planet X) cannot read/write planet Y records

* Attempts at BTP CF deploy: 

https://port4004-workspaces-ws-e83f3.us10.trial.applicationstudio.cloud.sap/

https://port5173-workspaces-ws-e83f3.us10.trial.applicationstudio.cloud.sap/