import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.healthcare.basic{
   export class Doctor extends Participant {
      doctorId: string;
      firstName: string;
      lastName: string;
      specialist: string;
      workExp: string;
      hospital: string;
      phNo: string;
   }
   export class Patient extends Participant {
      patientId: string;
      firstName: string;
      lastName: string;
      age: string;
      address: string;
      phNo: string;
   }
   export class MedicalInfo extends Asset {
      owner: Patient;
      medId: string;
      allergy: string;
      medication: string;
      pastVisitsArray: Visits[];
      permissionedDoctorsId: string[];
   }
   export class Visits {
      visitDate: Date;
      doctorId: string;
      doctorName: string;
      procedure: string;
      medicationPrescribed: string;
   }
   export class UpdateVisit extends Transaction {
      asset: MedicalInfo;
      procedure: string;
      medicationPrescribed: string;
   }
   export class GivePermission extends Transaction {
      asset: MedicalInfo;
      doctorId: string;
   }
   export class RevokePermission extends Transaction {
      asset: MedicalInfo;
      doctorId: string;
   }
// }
