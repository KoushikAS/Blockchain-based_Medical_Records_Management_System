# healthcare

Building a healthcare network for storing medical history

commands:

To intall and run the network  
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.11.bna
sudo composer network start --networkName healthcare --networkVersion 0.0.11 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

to upgrade the network :
sudo composer archive create --sourceType dir --sourceName .
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.12.bna
sudo composer network upgrade -c PeerAdmin@hlfv1 -n healthcare -V 0.0.12

To start already defined the rest server :

sudo composer-rest-server -c admin@healthcare -p 3001

export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "78d4e9b0bf14b1849738",
    "clientSecret": "fb5076fa93783b8dd9b7d6ab62f8ebbe9938438e",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "http://localhost:4200?loggedIn=true",
    "failureRedirect": "/"
  }
}'

//composer-rest-server -c admin@healthcare -n never -u true -d n -w true
sudo -E composer-rest-server -c admin@healthcare -n never  -m true -a true


to start the frontend:
cd healthcare-app
npm start

to create bna file : composer archive create -t dir -n . 

to import the cards : composer card import --file networkadmin.card

to ping the network :composer network ping -c healthcare 

to create a new rest server 
composer-rest-server

Important sites :
https://medium.com/coinmonks/getting-started-with-hyperledger-composer-34cb7228d44c

https://stackoverflow.com/questions/51975866/hyperledger-composer-cli-ping-to-a-business-network-returns-accessexception/51983081#51983081

https://www.ibm.com/developerworks/cloud/library/cl-deploy-interact-extend-local-blockchain-network-with-hyperledger-composer/index.html

To run composer-playground: https://localhost:8080 (in incognito mode preferably)
To run rest services: https://localhost:3000
To run run frontend: https://localhost:4200
