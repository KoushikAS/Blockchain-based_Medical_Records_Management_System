'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.RevokePermission} revokePermission
 * @transaction
 */

 async function revokePermission(tx){
    var index = tx.asset.permissionedDoctorsId.indexOf(tx.doctorId);
    if (index > -1) {
    tx.asset.permissionedDoctorsId.splice(index, 1); 
    }
    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }

