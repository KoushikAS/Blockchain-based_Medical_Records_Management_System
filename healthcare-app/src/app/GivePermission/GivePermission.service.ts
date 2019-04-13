import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { GivePermission } from '../org.healthcare.basic';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class GivePermissionService {

  private NAMESPACE = 'GivePermission';

  constructor(private dataService: DataService<GivePermission>) {
  };

  public getAll(): Observable<GivePermission[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<GivePermission> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<GivePermission> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<GivePermission> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<GivePermission> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

