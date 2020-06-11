import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDEMService {

  constructor() { }
  private dataSource = new BehaviorSubject("default message");
	serviceData = this.dataSource.asObservable();

	changeDataDEM(data: any){
		this.dataSource.next(data);  //Permite usar variables que se encuentra en .ts diferente al de trabajo
	}
}
