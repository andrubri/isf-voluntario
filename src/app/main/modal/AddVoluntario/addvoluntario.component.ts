import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
    selector: 'app-modal',
    templateUrl: './addvoluntario.component.html',
    styleUrls: ['./addvoluntario.component.scss']
})
export class AddvoluntarioComponent implements OnInit {
    datos: any;
    myControl = new FormControl();
    options: any[] = [
        {name: 'Mary'},
        {name: 'Shelley'},
        {name: 'Igor'}
    ];
    filteredOptions: Observable<any[]>;

    constructor(
        private _formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddvoluntarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, public router: ActivatedRoute) {

        this.datos = data;
        this.options = this.datos.items;
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : (value.nombre || value.Persona.nombre) + ' ' + (value.apellido || value.Persona.apellido)),
                map(name => name ? this._filter(name) : this.options.slice())
            );
    }

    displayFn(user?: any): string | undefined {
        const nombre = user.nombre || user.Persona.nombre;
        const apellido = user.apellido || user.Persona.apellido;
        return user ? nombre + ' ' + apellido : undefined;
    }

    private _filter(name: string): any[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    onCloseCancel() {
        this.dialogRef.close('Cancel');
    }

    ConfirmarAccion() {
        if (this.myControl.value.idPersona) {
            this.datos.callback(this.myControl.value);
            this.dialogRef.close('Confirm');
        }else{
            this.myControl.setErrors({"noValid": true});
        }
    }


}
