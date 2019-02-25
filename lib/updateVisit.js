
'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.UpdateVisit} updateVisit
 * @transaction
 */

  async function updateVisit(tx){
    tx.asset.pastVisitsArray.push(tx.newVisit);
    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }
