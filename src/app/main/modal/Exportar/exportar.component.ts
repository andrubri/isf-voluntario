import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
    selector: 'app-modal',
    templateUrl: './exportar.component.html',
    styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {
    datos: any;
    ctrFechaDesde = new FormControl();
    ctrFechaHasta = new FormControl();
    options: any[] = [
        {name: 'Mary'},
        {name: 'Shelley'},
        {name: 'Igor'}
    ];
    filteredOptions: Observable<any[]>;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ExportarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public router: ActivatedRoute) {

        this.datos = data;
        this.options = this.datos.items;
    }

    ngOnInit() {

    }

    onCloseCancel() {
        this.dialogRef.close('Cancel');
    }

    ConfirmarAccion() {
        if (this.ctrFechaDesde.status === 'VALID' && this.ctrFechaDesde.status === 'VALID') {
            if (Date.parse(this.ctrFechaDesde.value) < Date.parse(this.ctrFechaHasta.value)) {
                const data = {fechaDesde: this.ctrFechaDesde.value, fechaHasta: this.ctrFechaHasta.value};
                this.datos.callback(data);
                this.dialogRef.close('Confirm');
            } else {
                this.ctrFechaHasta.setErrors({'noValid': true});
            }
        }
    }


}
