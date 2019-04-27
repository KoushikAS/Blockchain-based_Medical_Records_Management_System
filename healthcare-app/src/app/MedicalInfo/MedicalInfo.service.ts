import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { MedicalInfo } from '../org.healthcare.basic';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class MedicalInfoService {

  private NAMESPACE = 'MedicalInfo';

  constructor(private dataService: DataService<MedicalInfo>) {
  };

  public getAll(): Observable<MedicalInfo[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<MedicalInfo> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<MedicalInfo> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<MedicalInfo> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<MedicalInfo> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
