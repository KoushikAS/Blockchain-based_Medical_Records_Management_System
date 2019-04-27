import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Doctor } from '../org.healthcare.basic';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class DoctorService {

  private NAMESPACE = 'Doctor';

  constructor(private dataService: DataService<Doctor>) {
  };

  public getAll(): Observable<Doctor[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Doctor> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Doctor> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Doctor> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Doctor> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
