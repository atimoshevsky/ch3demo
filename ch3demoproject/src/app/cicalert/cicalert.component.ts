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
  validationIDNumber: string;

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
  customerID: number;

  public constructor(init?: Partial<TaxStatus>) {
    Object.assign(this, init);
  }
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
  taxStatusList: Array<TaxStatus>;
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
    for (let i = 0; i < this.cicAlertList.length; i++) {

      if (this.cicAlertList[i].status.toLowerCase() === 'open') {
        if (this.cicAlertList[i].validationIDNumber !== scForm.validationIDNumber) {
          this.cicAlertList[i].status = 'Closed(new validation id provided)';
        }
        else {
          this.cicAlertList[i].status = 'Closed(new reference data provided)';
        }
      }
    }

    let item = new CicAlert({
      customerID: scForm.customerID,
      formType: scForm.formType,
      fromValue: from,
      toValue: to,
      createdDate: new Date().toLocaleTimeString(),
      status: 'Open',
      validationIDNumber: scForm.validationIDNumber
    })
    this.cicAlertList.push(item);

  }

  createTaxStatus(scForm: ScFormData, docType: string) {
    for (let i = 0; i < this.taxStatusList.length; i++) {
      if (this.taxStatusList[i].customerID === scForm.customerID) {
        this.taxStatusList[i].endDate = new Date().toLocaleTimeString();
        if (docType) {
          this.taxStatusList[i].docType = docType;
        }
      }
    }

    let taxStatusItem = new TaxStatus(
      {
        effactiveDate: new Date().toLocaleTimeString(),
        endDate: '',
        docType: scForm.formType,
        ch3Status: scForm.ch3Status,
        ch4Status: scForm.ch4Status,
        customerID: scForm.customerID
      }
    )

    this.taxStatusList.push(taxStatusItem);
  }

  loadCustomer() {
    let itemFound = false;
    for (let i = 0; i < this.referenceDataList.length; i++) {
      if (this.referenceDataList[i].customerID === this.customerReferenceData.customerID) {
        itemFound = true;
        let scForm = this.getScForm(this.referenceDataList[i].customerID);
        if (scForm && scForm.eyResult.toLowerCase() === 'valid') {
          if (this.cicAlertList.length === 0) {
            this.createTaxStatus(scForm, null);
          }
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


    this.customerReferenceData.customerName = '';
    this.customerReferenceData.address = '';
    this.customerReferenceData.loadedDate = '';
  }

  loadScForm() {

    let itemFound = false;

    for (let i = 0; i < this.scFormDataList.length; i++) {
      if (this.scFormData.customerID === this.scFormDataList[i].customerID) {
        itemFound = true;
        this.scFormDataList[i].ch3Status = this.scFormData.ch3Status;
        this.scFormDataList[i].ch4Status = this.scFormData.ch4Status;
        this.scFormDataList[i].eyResult = this.scFormData.eyResult;
        if (this.scFormData.eyResult.toLowerCase() === 'valid' && 
            this.scFormData.validationIDNumber !== this.scFormDataList[i].validationIDNumber &&
            this.cicAlertList.length > 0) {

          this.createTaxStatus(this.scFormData, null);
        }
        this.scFormDataList[i].formType = this.scFormData.formType;
        this.scFormDataList[i].validationIDNumber = this.scFormData.validationIDNumber;
        this.scFormDataList[i].loadedDate = new Date().toLocaleTimeString();
      }
    }

    if (!itemFound) {
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
    }

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
    this.taxStatusList = new Array<TaxStatus>();
  }

}
