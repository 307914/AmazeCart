
echo "Navigating to client";
cd ../Amazecart;
npm install;

echo "Running prod build"
npm run build
echo "echo build successfully";

echo "removing previous dist from server";
rm -r ../server3/dist;

echo "removing prod dist folder from client to server";
mv dist ../server3/

cd ../server3;
npm install;





