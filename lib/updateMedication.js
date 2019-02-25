

'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.UpdateMedication} updateMedication
 * @transaction
 */

 async function updateMedication(tx){
    tx.asset.medication = tx.newMedication;
    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }


 
// async function sampleTransaction(tx) {
//     // Save the old value of the asset.
//     const oldValue = tx.asset.value;

//     // Update the asset with the new value.
//     tx.asset.value = tx.newValue;

//     // Get the asset registry for the asset.
//     const assetRegistry = await getAssetRegistry('org.healthcare.basic.SampleAsset');
//     // Update the asset in the asset registry.
//     await assetRegistry.update(tx.asset);

//     // Emit an event for the modified asset.
//     let event = getFactory().newEvent('org.healthcare.basic', 'SampleEvent');
//     event.asset = tx.asset;
//     event.oldValue = oldValue;
//     event.newValue = tx.newValue;
//     emit(event);
// }
