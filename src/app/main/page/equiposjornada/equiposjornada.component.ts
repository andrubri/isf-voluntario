import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

import {fuseAnimations} from '@fuse/animations';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ISFService} from '../../../services/isf.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AddvoluntarioComponent} from '../../modal/AddVoluntario/addvoluntario.component';

@Component({
    selector: 'formequipos',
    templateUrl: './equiposjornada.component.html',
    styleUrls: ['./equiposjornada.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EquiposJornadaComponent implements OnInit, OnDestroy {
    pageType: string;
    perfiles: any;
    equipo: any;
    jornada: any;
    personas_act: any[];
    public dataPersonas: MatTableDataSource<any> = new MatTableDataSource();
    public displayedColumnsPresente = ['nombre', 'apellido', 'presente'];
    public displayedColumnsVoluntario = ['nombre', 'apellido'];

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
        if (this._route.snapshot.paramMap.get('jornada')) {
            const idAct = Number(this._route.snapshot.paramMap.get('jornada'));
            this.jornada = await this._isfService.getJornadaById(idAct)
            this.equipo = await this._isfService.getEquipoById(this.jornada.idEquipo);
            this.dataPersonas.data = await this._isfService.getPersonasJornadaAct(idAct);
            this.personas_act = await this._isfService.getPersonasAct(this.jornada.idEquipo)
            this.pageType = 'edit';
        }else{
            this._router.navigate(['equipos']);
        }

        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    private openDialogAdd(datos: any) {
        this._dialog.open(AddvoluntarioComponent, {
            width: datos.anchoModal ? datos.anchoModal : '50%',
            height: datos.altoModal ? datos.altoModal : '17%',
            data: datos,
            panelClass: 'popup'
        });
    }

    addVoluntario(): void {

        this.openDialogAdd({
            etiqueta: 'AddVoluntario',
            txtBoton: 'Seleccionar',
            label: 'Voluntario',
            items: this.personas_act,
            callback: async (item) => {
                const info = this.dataPersonas.data;
                if (this.equipo.idEquipo) {
                    const newItem: any = this._isfService.addPersonaJornada(this.jornada.idJornadas, item.idPersona);
                    newItem.nombre = item.Persona.nombre;
                    newItem.apellido = item.Persona.apellido;
                    info.push(newItem);
                } else {
                    info.push(item);
                }
                this.dataPersonas.data = info;
            },
            altoModal: '300px',
            anchoModal: '450px'
        });
    }

    confAsistencia(idVoluntario: number, valor: any): void{
        this._isfService.AsistenciaJornada(this.jornada.idJornadas, idVoluntario, valor.checked);
    }

    getStatus(value: any): boolean{
        return (value.PersonaJornadas[0].confirmacion === 'true') ? true : false;
    }

}
