import { AreaCodes } from '../../areacodes/models/AreaCodes';
import { ClientGroup } from './ClientGroup';

export interface Client {
  ClientId: number;
  ClientName: string;
  ClaimsManager: string;
  ClientGroup: ClientGroup;
  AreaCodes: AreaCodes;
  IsActive: boolean;

  // Optional fields (not shown in UI)
  ClientGroupId?: number;
  AreaCodeId?: number;
  Address?: string;
  ClaimFormDeclaration?: string | null;
  ClaimFormDeclarationPlain?: string | null;
  Code?: string;
  CompanyLogo?: string;
  CompanyLogoData?: any;
  DoTextExport?: boolean;
  Fax?: string;
  NearestClaimCentre?: boolean;
  OtherValidationNotes?: string | null;
  OtherValidationNotesPlain?: string | null;
  PolicyFile?: string;
  PolicyLabel?: string;
  PolicyLookup?: boolean;
  PolicyLookupFileData?: any;
  PolicyLookupFileName?: string | null;
  PolicyLookupPath?: string | null;
  PrintName?: string;
  ProcessClaims?: boolean;
  Tel?: string;
  UseMembershipNumber?: boolean;
  Validate?: boolean;
  ValidationExternalFile?: boolean;
  ValidationLabel1?: string | null;
  ValidationLabel2?: string | null;
  ValidationLabel3?: string | null;
  ValidationLabel4?: string | null;
  ValidationLabel5?: string | null;
  ValidationLabel6?: string | null;
  ValidationOther?: boolean;
  ValidationWeb?: boolean;
  WebURL?: string;
  WebValidationAVS?: boolean;
  WebValidationOTH?: boolean;
  WebValidationURL?: string;
  EnableVoucherExportOnDeathClaim?: boolean;
}