# Customer-React
Auth: Tuan anh nguyen

npx json-server --watch json-server/db.json --port 3001

curl -X POST -H "Content-Type: application/json" -d '{"title":"learning"}' http://localhost:3001/customers
npx concurrently -k "json-server --watch json-server/db.json --port 3001" "npm start"