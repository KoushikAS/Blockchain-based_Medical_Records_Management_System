import { Asset } from './org.hyperledger.composer.system';
import { Participant } from './org.hyperledger.composer.system';
import { Transaction } from './org.hyperledger.composer.system';
import { Event } from './org.hyperledger.composer.system';
// export namespace org.healthcare.basic{
export class Doctor extends Participant {
   doctorId: string;
   firstName: string;
   lastName: string;
}
export class Patient extends Participant {
   patientId: string;
   firstName: string;
   lastName: string;
}
export class MedicalInfo extends Asset {
   owner: Patient;
   medId: string;
   medication: string;
   pastVisitsArray: Visits[];
}
export class Visits {
   visitDate: Date;
   procedure: string;
   doctorId: string;
   medicationPrescribed: string;
}
export class UpdateMedication extends Transaction {
   asset: MedicalInfo;
   newMedication: string;
}
export class UpdateVisit extends Transaction {
   asset: MedicalInfo;
   visitDate: Date;
   procedure: string;
   doctorId: string;
   medicationPrescribed: string;
}
// }
