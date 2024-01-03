# Blockchain-based Medical Records Management System

## Introduction

This Blockchain-based Medical Records Management System leverages Hyperledger Fabric to securely store and manage patients' medical histories, including x-rays, prescriptions, and lab results. The system ensures the immutability of data, making it a reliable source for critical medical decisions.

## System Overview

- **Data Storage**: Patient interactions with medical professionals are recorded on a blockchain network.
- **Accessibility**: Both patients and doctors can access medical records easily for efficient consultations.
- **Immutability**: Blockchain technology guarantees the integrity of medical records.
- **Application Scope**: Useful during critical times for making informed medical decisions.

## Getting Started

### Prerequisites
- Hyperledger Fabric tools
- Node.js and npm
- Hyperledger Composer

### Installation

1. **Start Hyperledger Fabric Network**
   - Navigate to the `fabrictools` folder.
   - Execute `./startFabric.sh` and `sudo ./createPeerAdminCard.sh`.

2. **Deploy Healthcare Network**
   - Change to the `healthcare` directory.
   - Create a Composer archive with `composer archive create -t dir -n .`.
   - Install and start the network:
     ```
     sudo composer network install --card PeerAdmin@hlfv1 --archiveFile healthcare@0.0.14.bna
     sudo composer network start --networkName healthcare --networkVersion 0.0.14 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
     sudo composer card import --file networkadmin.card
     ```

3. **Start REST Servers**
   - Install GitHub passport strategy `npm install -g passport-github` (only once).
   - Set environment variables for OAuth and start the REST server in multi-user mode.
   - Run the server on different ports (3001 and 3002) as shown in the provided commands.

4. **Start Frontend Application**
   - Install lodash and its types `npm install lodash` and `npm i --save-dev @types/lodash@4.14.121`.
   - Navigate to the `healthcare-app` or `healthcare-app-2` directory.
   - Start the application with `npm start`.

### Note
Currently, the system lacks a sign-out feature. To switch users, restart the REST server at port 3000.

### Terminating the Network
1. Delete the admin card: `sudo composer card delete --card admin@healthcare`.
2. Stop and tear down the Fabric network in the `fabrictools` folder.

### Upgrading the Network
1. Increment the package version in `package.json`.
2. Deploy the updated network with the provided commands.

## Additional Resources
- [Performance Analysis of Blockchain-based Medical Records Management System](https://ieeexplore.ieee.org/abstract/document/9016812)
- Relevant tutorials and problem-solving resources are listed in the `Important sites` section.

## Application Access
- **Composer Playground**: `https://localhost:8080` (preferably in incognito mode).
- **REST Server (Multi-User)**: `https://localhost:3000`.
- **REST Server (Admin)**: `https://localhost:3001`.
- **Frontend Application**: `https://localhost:4200`.

## Contributions

This project was developed as part of an academic final year project. Contributions were made solely by Koushik Annareddy Sreenath, Bhavya Jain, Nikita Menon, and Divyansh Lohia, adhering to the project guidelines and requirements set by Ramaiah Institute of Technology.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Gratitude to Shilpa Chaudhari, Vijaya Kumar B.P and the course staff for their invaluable guidance.
