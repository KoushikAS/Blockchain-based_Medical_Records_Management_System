import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Patient } from '../org.healthcare.basic';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PatientService {

  private NAMESPACE = 'Patient';

  constructor(private dataService: DataService<Patient>) {
  };

  public getAll(): Observable<Patient[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Patient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Patient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Patient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Patient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}