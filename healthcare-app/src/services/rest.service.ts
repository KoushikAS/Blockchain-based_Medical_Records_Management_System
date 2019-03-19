import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RestService{
    private headers: Headers;

    constructor(private http: Http) {
        }
    
        
        signUpDoctor(data) {
            const Doctor = {
              $class: 'org.healthcare.basic.Doctor',
              doctorId: data.id,
              firstName: data.firstName,
              lastName: data.lastName
            };
            
            console.log(Doctor);
            return this.http.post('http://localhost:3001/api/org.healthcare.basic.Doctor', Doctor).toPromise()
              .then(() => {
                const identity = {
                  participant: 'org.healthcare.basic.Doctor#' + data.id,
                  userID: data.id,
                  options: {}
                };
        
                return this.http.post('http://localhost:3001/api/system/identities/issue', identity, {responseType: 3}).toPromise();  //3 indicates blob which is the required response type
              })
              .then(function(response) {
                console.log(response.blob())
                return response.blob();
              })
              .then((cardData) => {
              console.log('CARD-DATA', cardData);
                const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
        
                const formData = new FormData();
                formData.append('card', file);
                formData.append('name','Doctor'+data.id)
        
                const headers = new Headers();
                // headers.set('Content-Type', 'multipart/form-data');
                // headers.set('boundary','----WebKitFormBoundaryyrV7KO0BoCBuDbTL')
                return this.http.post('http://localhost:3000/api/wallet/import', formData, {
                  withCredentials: true,
                  headers
                }).toPromise();
              });
          }

          signUpPatient(data) {
            const Patient = {
              $class: 'org.healthcare.basic.Patient',
              patientId: data.id,
              firstName: data.firstName,
              lastName: data.lastName
            };
            
            console.log(Patient);
            return this.http.post('http://localhost:3001/api/org.healthcare.basic.Patient', Patient).toPromise()
              .then(() => {
                const identity = {
                  participant: 'org.healthcare.basic.Patient#' + data.id,
                  userID: data.id,
                  options: {}
                };
        
                return this.http.post('http://localhost:3001/api/system/identities/issue', identity, {responseType: 3}).toPromise();  //3 indicates blob which is the required response type
              })
              .then(function(response) {
                console.log(response.blob())
                return response.blob();
              })
              .then((cardData) => {
              console.log('CARD-DATA', cardData);
                const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
        
                const formData = new FormData();
                formData.append('card', file);
                formData.append('name','Patient'+data.id)
        
                const headers = new Headers();
                // headers.set('Content-Type', 'multipart/form-data');
                // headers.set('boundary','----WebKitFormBoundaryyrV7KO0BoCBuDbTL')
                return this.http.post('http://localhost:3000/api/wallet/import', formData, {
                  withCredentials: true,
                  headers
                }).toPromise();
              });
            }
        
}