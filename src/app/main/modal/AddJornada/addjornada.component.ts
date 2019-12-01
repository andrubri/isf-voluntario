import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';


@Component({
    selector: 'app-modal',
    templateUrl: './addjornada.component.html',
    styleUrls: ['./addjornada.component.scss']
})
export class AddjornadaComponent implements OnInit {
    datos: any;
    myControl = new FormControl();
    ctrDescripcion = new FormControl();
    options: any[] = [
        {name: 'Mary'},
        {name: 'Shelley'},
        {name: 'Igor'}
    ];
    filteredOptions: Observable<any[]>;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddjornadaComponent>,
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
        if(this.myControl.status == 'VALID' && this.ctrDescripcion.status == 'VALID'){
            const data = {fecha: this.myControl.value, descripcion: this.ctrDescripcion.value};
            this.datos.callback(data);
            this.dialogRef.close('Confirm');
        }
    }


}
