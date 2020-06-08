import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor() { }
  private dataSource = new BehaviorSubject("default message");
	serviceData = this.dataSource.asObservable();

	changeData(data: any){
		this.dataSource.next(data);
	}
}
