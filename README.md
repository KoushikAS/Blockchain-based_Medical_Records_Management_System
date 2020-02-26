# Blockchain-based Medical Records Management System

Digital Platforms for storing of medical history has become widely popular as they prove to be a
helpful tool in storing all medical information pertaining to an individual such as x-ray’s,
prescriptions, lab results, etc. A blockchain network, using Hyperledger Fabric, collects data of
each patient interaction with the medical professionals. Once a patient visits a doctor, the
prescription along with necessary observation is updated on the user’s log. The data pertains to
health issues faced along with medical solutions and/or therapies proposed by the doctor. Thus,
when a patient visits a doctor again, he/she can access the data readily, by either parties.
The reason to port such an application to blockchain is to ensure that this data is immutable. This
is due to the reason that during critical times the highly sensitive nature of the patient’s medical
history can lead to doctors taking better and effective decisions.

---------------------------------------------------------------------------------------------------------
To start the Application:

1) Run the HyperledgerChannel (go to  fabrictools folder)
./startFabric.sh
sudo ./createPeerAdminCard.sh


2)To intall and deploy the healthcare network  (Go to healthcare folder) 

composer archive create -t dir -n . 

sudo composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.14.bna

sudo composer network start --networkName healthcare --networkVersion 0.0.14 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

sudo composer card import --file networkadmin.card

3)To start rest server as admin (To create and issue participants and card) (Go to healthcare folder) open a new terminal:

sudo composer-rest-server -c admin@healthcare -p 3001

4)To start rest server in multimode (To do normal operations) (Go to healthcare folder) open a new terminal:

npm install -g passport-github  (Note: do this once )

export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "78d4e9b0bf14b1849738",
    "clientSecret": "fb5076fa93783b8dd9b7d6ab62f8ebbe9938438e",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "http://localhost:4200/login",
    "failureRedirect": "/"
  }
}'

sudo -E composer-rest-server -c admin@healthcare -n never  -m true -a true

5)To start rest server in multimode (To do normal operations) (Go to healthcare folder) open a new terminal:

npm install -g passport-github  (Note: do this once )

export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "4212eab9824a9f0cff32",
    "clientSecret": "18754f39b6e95f0399f38b489e8ca91072a4edcb",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "http://localhost:4201/login",
    "failureRedirect": "/"
  }
}'

sudo -E composer-rest-server -c admin@healthcare -n never  -m true -a true -p 3002


6)To start the frontend of the app in port 4200 (Go to healthcare folder) open a new terminal:
npm install lodash  (only once)
npm i --save-dev @types/lodash@4.14.121   (only once)
cd healthcare-app
npm start

7)To start the frontend of the app in port 4200 (Go to healthcare folder) open a new terminal:
npm install lodash  (only once)
npm i --save-dev @types/lodash@4.14.121   (only once)
cd healthcare-app-2
npm start

---------------------------------------------------------------------------------------------------------
Note right now there is no Signout Feature. will try to fix it in future .To try as a different user u need to terminate and start the rest server at port 3000 i.e.
1) press ctrl+c in step 4 t stop the rest server   
2) sudo -E composer-rest-server -c admin@healthcare -n never  -m true -a true
3) go to https://localhost:4200

---------------------------------------------------------------------------------------------------------
Terminating the network :

1) Delete the admin card (Go to healthcare folder)
sudo composer card delete --card admin@healthcare

2)To stop the hyperledger channel (go to fabrictools folder)
./stopFabric.sh 

./teardownFabric.sh 

---------------------------------------------------------------------------------------------------------
Other Important Commands:

To create bna file : composer archive create -t dir -n . 

To import the cards : composer card import --file networkadmin.card

To ping the network :composer network ping -c admin@healthcare 

To create a new rest server 
composer-rest-server

---------------------------------------------------------------------------------------------------------
To upgrade the network :
1)Change the pakage,json version to next higher one

2) Run following  commands to deploy the new network :

sudo composer archive create --sourceType dir --sourceName .
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.13.bna
sudo composer network upgrade -c PeerAdmin@hlfv1 -n healthcare -V 0.0.13

---------------------------------------------------------------------------------------------------------
Important sites :

https://medium.com/coinmonks/getting-started-with-hyperledger-composer-34cb7228d44c

https://stackoverflow.com/questions/51975866/hyperledger-composer-cli-ping-to-a-business-network-returns-accessexception/51983081#51983081

https://www.ibm.com/developerworks/cloud/library/cl-deploy-interact-extend-local-blockchain-network-with-hyperledger-composer/index.html

https://medium.com/coinmonks/building-a-blockchain-application-using-hyperledger-fabric-with-angular-frontend-part-2-22ef7c77f53

https://medium.com/@CazChurchUk/developing-multi-user-application-using-the-hyperledger-composer-rest-server-b3b88e857ccc

---------------------------------------------------------------------------------------------------------
Working of the application 

To run composer-playground: https://localhost:8080 (in incognito mode preferably)

To run rest server of multimode server: https://localhost:3000

To run rest server of admin used to create and issue cards :https://localhost:3001

To run run frontend: https://localhost:4200
