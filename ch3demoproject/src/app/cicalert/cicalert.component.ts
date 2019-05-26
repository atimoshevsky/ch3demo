import { Component, OnInit } from '@angular/core';

class ScFormData{
  customerId: number;
  formType:string;
  ch4Status:string;
  ch3Status:string;

  public constructor(init?: Partial<ScFormData>) {
    Object.assign(this, init);
  }
}

class ReferenceData {
  customerID: number;
  customerName: string;
  address: string;


  public constructor(init?: Partial<ReferenceData>) {
    Object.assign(this, init);
  }
}


class CicAlert {
  
  createdDate: string;
  status: string;
  fromValue: string;
  toValue: string;
  description: string;

  public constructor(init?: Partial<CicAlert>) {
    Object.assign(this, init);
  }
}

class TaxStatus {
  effactiveDate: string;
  endDate: string;
  docType: string;
  formType: string;
  ch4Status: string;
  ch3Status: string;
}

@Component({
  selector: 'app-cicalert',
  templateUrl: './cicalert.component.html',
  styleUrls: ['./cicalert.component.css']
})
export class CicalertComponent implements OnInit {

  referenceDataList: Array<ReferenceData>;
  scFormData: ScFormData;
  cicAlertList: Array<CicAlert>;



  constructor() {

  }

  ngOnInit() {

    this.cicAlertList = new Array<CicAlert>();
    this.referenceDataList = new Array<ReferenceData>();
    this.referenceDataList.push(new ReferenceData({ customerID:1, customerName:'Alex Timoshevskyi', address: 'Szybowcowa 42' }));
    //  cicAlertList = [
    //    ,
    //    new CicAlert({createdDate:Date.now.toString(), status :'Open',fromValue:'CA',toValue:'US', description:'US Country of citizenship'}),
    //  ]
  }

}
