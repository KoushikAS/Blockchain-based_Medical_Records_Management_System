
'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.UpdateVisit} updateVisit
 * @transaction
 */

  async function updateVisit(tx){
    var factory = getFactory();
    var newVisit = factory.newConcept('org.healthcare.basic', 'Visits');

    newVisit.visitDate =  tx.visitDate;
    newVisit.procedure = tx.procedure;
    newVisit.doctorId = tx.doctorId
    newVisit.medicationPrescribed = tx.medicationPrescribed

    tx.asset.pastVisitsArray.push(newVisit);
    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }
