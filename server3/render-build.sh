
echo "Navigating to client";
cd ../Amazecart;
npm install;

echo "Running prod build"
npm run build
echo "echo build successfully";

echo "removing previous dist from server";
rm -r ../server/dist;

echo "removing prod dist folder from client to server";
mv dist ../server/

cd ../server;
npm install;



