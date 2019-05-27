import { Component, OnInit } from '@angular/core';


class ScFormData {
  loadedDate: string;
  customerID: number;
  formType: string;
  ch4Status: string;
  ch3Status: string;
  eyResult: string;
  validationIDNumber: string;

  public constructor(init?: Partial<ScFormData>) {
    Object.assign(this, init);
  }
}

class ReferenceData {
  loadedDate: string;
  customerID: number;
  customerName: string;
  address: string;


  public constructor(init?: Partial<ReferenceData>) {
    Object.assign(this, init);
  }
}


class CicAlert {

  customerID: number;
  formType: string;
  createdDate: string;
  status: string;
  fromValue: string;
  toValue: string;

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

  customerReferenceData: ReferenceData = new ReferenceData();
  scFormData: ScFormData = new ScFormData();

  referenceDataList: Array<ReferenceData>;
  scFormDataList: Array<ScFormData>;

  cicAlertList: Array<CicAlert>;


  constructor() {

  }

  getScForm(customerID: number): ScFormData {
    for (let i = 0; this.scFormDataList.length; i++) {
      if (this.scFormDataList[i].customerID === customerID) {
        return this.scFormDataList[i];
      }
    }
    return null;
  }

  createCicAlert(from: string, to: string, scForm: ScFormData) {
    let item = new CicAlert({
      customerID: scForm.customerID,
      formType: scForm.formType,
      fromValue: from,
      toValue: to,
      createdDate: new Date().toLocaleTimeString(),
      status: 'OPEN'
    })


    this.cicAlertList.push(
      item
    )
    console.log(this.cicAlertList);
  }

  createTaxStatus() {

  }

  loadCustomer() {
    let itemFound = false;
    for (let i = 0; i < this.referenceDataList.length; i++) {
      if (this.referenceDataList[i].customerID === this.customerReferenceData.customerID) {
        itemFound = true;
        let scForm = this.getScForm(this.referenceDataList[i].customerID);
        if (scForm && scForm.eyResult.toLowerCase() === 'valid') {
          this.createCicAlert(this.referenceDataList[i].address, this.customerReferenceData.address, scForm);
        }

        this.referenceDataList[i].address = this.customerReferenceData.address;
        this.referenceDataList[i].customerName = this.customerReferenceData.customerName;
        this.referenceDataList[i].loadedDate = new Date().toLocaleTimeString();
      }
    }
    if (!itemFound) {
      this.referenceDataList.push(new ReferenceData(
        {
          loadedDate: new Date().toLocaleTimeString(),
          customerID: this.customerReferenceData.customerID,
          customerName: this.customerReferenceData.customerName,
          address: this.customerReferenceData.address
        }));
    }


    this.customerReferenceData.customerID = 0;
    this.customerReferenceData.customerName = '';
    this.customerReferenceData.address = '';
    this.customerReferenceData.loadedDate = '';
  }

  loadScForm() {

    this.scFormDataList.push(
      new ScFormData(
        {
          loadedDate: new Date().toLocaleTimeString(),
          customerID: this.scFormData.customerID,
          ch3Status: this.scFormData.ch3Status,
          ch4Status: this.scFormData.ch4Status,
          formType: this.scFormData.formType,
          eyResult: this.scFormData.eyResult,
          validationIDNumber: this.scFormData.validationIDNumber
        }
      ));

    this.scFormData.customerID = 0;
    this.scFormData.formType = '';
    this.scFormData.ch3Status = '';
    this.scFormData.ch4Status = '';
    this.scFormData.eyResult = '';
    this.scFormData.validationIDNumber = '';
    this.scFormData.loadedDate = '';
  }
  ngOnInit() {

    this.cicAlertList = new Array<CicAlert>();
    this.referenceDataList = new Array<ReferenceData>();
    this.scFormDataList = new Array<ScFormData>();
  }

}
