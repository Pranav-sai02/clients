
export interface ServiceProviders {
  ServiceProviderId: number;
  Name: string;
  VATNumber: string;
  CompanyRegNo: string;
  Branch: string;
  OfficeAddress: string;
  StorageAddress: string;
  TownCity: string;
  Province: string;
  ServiceProviderServiceTypeId: number;
  DesignationNumber: string;
  Manager: string;
  RatePerKm: number;
  RateAuthorisedOn: string;    // ISO date string
  RateAuthorisedby: string;
  IsActive: boolean;
  IsActiveOn: string;          // ISO date string
  IsActiveby: string;
  IsVerified: boolean;
  IsVerifiedOn: string;        // ISO date string
  IsVerifiedby: string;
  IsAccredited: boolean;
  IsAccreditedOn: string;      // ISO date string
  IsAccreditedby: string;
  ContactDetails: ContactDetail[];
}

export interface ContactDetail {
  Id: number;
  Type: string;
  Code: string;
  Value: string;
  Name: string;
  Comments: string;
}
