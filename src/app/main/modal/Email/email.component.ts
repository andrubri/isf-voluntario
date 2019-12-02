import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
    selector: 'app-modal',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
    datos: any;
    myControl = new FormControl();
    ctrAsunto = new FormControl();
    options: any[] = [];
    filteredOptions: Observable<any[]>;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<EmailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public router: ActivatedRoute) {

        this.datos = data;
    }

    ngOnInit() {

    }


    onCloseCancel() {
        this.dialogRef.close('Cancel');
    }

    ConfirmarAccion() {
        if (this.myControl.status === 'VALID' && this.ctrAsunto.status === 'VALID') {
            const resp = {mensaje: this.myControl.value, asunto: this.ctrAsunto.value};
            this.datos.callback(resp);
            this.dialogRef.close('Confirm');
        }
    }


}
