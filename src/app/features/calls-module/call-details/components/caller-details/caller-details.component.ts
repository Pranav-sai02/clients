import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SOUTH_AFRICAN_LANGUAGES } from '../../../../../constants/south-african-languages';
import { Call } from '../../../calls/models/Call';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../../client/services/client-service/client.service';
import { CallDataService } from '../../../calls/services/call-data-service/call-data.service';

@Component({
  selector: 'app-caller-details',
  standalone: false,
  templateUrl: './caller-details.component.html',
  styleUrl: './caller-details.component.css',
})
export class CallerDetailsComponent implements OnInit {


   languages = SOUTH_AFRICAN_LANGUAGES;
   caseRef!: string;
   callerName: string = '';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  activeTab: string = 'caller';
  callerForm!: FormGroup;
  caseData: Call | null = null;

  client: string ='';
  serviceTypes: string[] = ['Service A', 'Service B', 'Service C'];
  agents: any;
  callOpenDates: any;
  today: any;

  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  // phoneForm!: FormGroup;
  searchFields = [
    SearchCountryField.Name,
    SearchCountryField.DialCode,
    SearchCountryField.Iso2,
  ];

  

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private callDataService: CallDataService,
    private clientService: ClientService) {}

  ngOnInit(): void {

     this.route.queryParamMap.subscribe((params) => {
      this.caseRef = params.get('callRef') ?? '';
      this.callerName = params.get('callerName') ?? '';
      this.client = params.get('client') ?? '';
    });
    this.callerForm = this.fb.group({
      client: [''],
      serviceType: [''],
      consent: [''],
      firstName: [''],
      secondName: [''],
      callbackNumber: [''],
      isPolicyHolder: [''],
      agent: [''],
      callOpenDate: [''],
      language: [''],
      refGiven: [''],
    });
  }
  onSubmit(): void {
    if (this.callerForm.valid) {
      console.log(this.callerForm.value);
    }
  }
  
  getYearRange() {
    throw new Error('Method not implemented.');
  }
}
