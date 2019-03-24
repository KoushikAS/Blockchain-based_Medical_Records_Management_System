'use strict';

/**
 * Sample transaction
 * @param {org.healthcare.basic.GivePermission} givePermission
 * @transaction
 */

 async function givePermission(tx){
    tx.asset.permissionedDoctorsId.push(tx.doctorId);
    const assetRegistry = await getAssetRegistry('org.healthcare.basic.MedicalInfo');
    await assetRegistry.update(tx.asset);
 }

