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

><img width="496" height="217" alt="Screenshot 2025-09-22 at 10 06 17" src="https://github.com/user-attachments/assets/1de08dad-b798-42ae-9468-664e7aac3642" />

><img width="461" height="792" alt="Screenshot 2025-09-22 at 10 05 05" src="https://github.com/user-attachments/assets/1e4f4cc9-be88-4e8a-8c64-2709a4fa1cdc" /><img width="543" height="978" alt="Screenshot 2025-09-22 at 10 05 25" src="https://github.com/user-attachments/assets/f35fa715-8a05-4681-aef3-8bbb908668ee" />
><img width="1175" height="659" alt="Screenshot 2025-09-22 at 10 05 45" src="https://github.com/user-attachments/assets/e6f85db4-ad70-47da-ab3a-0fb239ad4a3d" />

