
'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.UpdateVisit} updateVisit
 * @transaction
 */

  async function updateVisit(tx){
    var now = new Date();
    var currentParticipant = getCurrentParticipant();
    var factory = getFactory();
    var newVisit = factory.newConcept('org.healthcare.basic', 'Visits');

    newVisit.visitDate =  now;
    newVisit.procedure = tx.procedure;
    newVisit.doctorId = currentParticipant.doctorId
    newVisit.doctorName = currentParticipant.firstName + " " + currentParticipant.lastName
    newVisit.medicationPrescribed = tx.medicationPrescribed

    tx.asset.pastVisitsArray.push(newVisit);
    tx.asset.medication = tx.medicationPrescribed;

    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }
