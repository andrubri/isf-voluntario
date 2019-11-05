import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import {ISFService} from '../../../services/isf.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AccionConfirmarComponent} from '../../modal/AccionConfirmar/accionconfirmar.component';
import {AddvoluntarioComponent} from '../../modal/AddVoluntario/addvoluntario.component';
import {AddjornadaComponent} from '../../modal/AddJornada/addjornada.component';
import { EmailComponent } from '../../modal/Email/email.component';

@Component({
    selector: 'persona',
    templateUrl: './persona.component.html',
    styleUrls: ['./persona.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class PersonaComponent implements OnInit, OnDestroy {
    pageType: string;
    personaForm: FormGroup = null;
    perfiles: any;
    persona: any;
    /* public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public dataPersonas: MatTableDataSource<any> = new MatTableDataSource();
    public dataJornadas: MatTableDataSource<any> = new MatTableDataSource(); */
    public displayedColumnsCoordinador = ['nombre', 'apellido'];
    public displayedColumnsVoluntario = ['nombre', 'apellido'];
    public displayedColumnsJornada = ['fecha', 'accion'];

    constructor(
        private _isfService: ISFService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog
    ) {
        this.perfiles = [];
        this._fuseProgressBarService.show();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        if (this._route.snapshot.paramMap.get('persona') && this._route.snapshot.paramMap.get('persona') !== 'new') {
            const idAct = Number(this._route.snapshot.paramMap.get('persona'));
            this.persona = await this._isfService.getPersonaById(idAct);
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.persona = {
                nombre: '',
                apellido: '',
                tipoDocumento: ' ',
                idDocumento: ' ',
                estado: '',
                ciudadResidencia: '',
                provinciaResidencia: '',
                paisOrigen: '',
                telefono: '',
                email:' ' ,
                nivelEstudios:' ' ,
                carrera: ' ',
                universidad:' ' ,
                ocupacion: ' ',
                comentarios:' ' ,
                dieta: ' ',
            
            };
         
        }

        this.personaForm = this.createPersonaForm();
        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createPersonaForm(): FormGroup {
        return this._formBuilder.group({
            nombre: [this.persona.nombre],
            apellido: [this.persona.apellido],
            tipoDocumento: [this.persona.tipoDocumento],
            idDocumento: [this.persona.idDocumento],
            estado: [this.persona.estado],
            ciudadResidencia: [this.persona.ciudadResidencia],
            provinciaResidencia: [this.persona.provinciaResidencia],
            paisOrigen: [this.persona.paisOrigen],
            telefono: [this.persona.telefono],
            email: [this.persona.email] ,
            nivelEstudios:[this.persona.nivelEstudios] ,
            carrera: [this.persona.carrera],
            universidad:[this.persona.universidad] ,
            ocupacion: [this.persona.ocupacion],
            comentarios:[this.persona.comentarios] ,
            dieta: [this.persona.dieta],
            idPersona: [this.persona.idPersona],

        });
    }

    /**
     * Save persona
     */
    async savePersona(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = this.personaForm.getRawValue();
        data.handle = FuseUtils.handleize(data.nombre);

        await this._isfService.savePersona(data);

        this._matSnackBar.open('Persona grabada', 'OK', {
            verticalPosition: 'top',
            duration: 2000
        });

        this._fuseProgressBarService.hide();
        this._router.navigate(['personas']);
    }

    /**
     * Add Persona
     */
    async addPersona(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.personaForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);

            await this._isfService.addPersona(data);

            // Show the success message
            this._matSnackBar.open('Persona grabada', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this._router.navigate(['personas']);
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la persona!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

    
}