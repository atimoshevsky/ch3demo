import { Component, OnInit } from '@angular/core';

class CicAlert
{
    createdDate:string;
    status:string;
    fromValue:string;
    toValue:string;
    description:string;

    public constructor(init?:Partial<CicAlert>) {
      Object.assign(this, init);
  }
}

class TaxStatus
{
  effactiveDate:string;
  endDate:string;
  docType:string;
  formType:string;
  ch4Status:string;
  ch3Status:string;
}

@Component({
  selector: 'app-cicalert',
  templateUrl: './cicalert.component.html',
  styleUrls: ['./cicalert.component.css']
})
export class CicalertComponent implements OnInit {

  cicAlertList:Array<CicAlert>;

  
    
  constructor() { 
   
  }

  ngOnInit() {

    this.cicAlertList = new Array<CicAlert>();
    this.cicAlertList.push(new CicAlert({createdDate:new Date().toISOString(), status :'Open',fromValue:'Szybowcowa 42',toValue:'Bulwar Dedala 10', description:'Mail address has been changed'}));
    //  cicAlertList = [
  //    ,
  //    new CicAlert({createdDate:Date.now.toString(), status :'Open',fromValue:'CA',toValue:'US', description:'US Country of citizenship'}),
  //  ]
  }

}
