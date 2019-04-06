import { Component } from '@angular/core';

export interface removeChild {
    remove(index);
}

@Component({
    selector: 'app-child',
    templateUrl: './medicalHistory.component.html',
    styleUrls: ['./medicalHistory.component.css']
})

export class MedicalHistory {

    public selfRef: MedicalHistory;

    public compInteraction: removeChild;

    constructor() {

    }

    removeMe(index:number) {
        this.compInteraction.remove(index);
    }
}
