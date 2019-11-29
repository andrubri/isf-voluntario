import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as shape from 'd3-shape';

import {fuseAnimations} from '@fuse/animations';

import {DashboardService} from 'app/main/page/dashboard/dashboard.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {ISFService} from '../../../services/isf.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: DashboardService,
        private _isfService: ISFService
    ) {
        /**
         * Widget 5
         */
        this.widget5 = {
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Jornadas',
            showYAxisLabel: false,
            yAxisLabel: 'Cantidad de Personas',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect: (ev) => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve: shape.curveBasis
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        this.widgets = {
            'widget5': {
                'title': 'Confirmados vs Asistencias',
                'mainChart': []
            },
        };
        this.projects = await this._isfService.getAllEquipos();
        this.changeEquipo(this.projects[0]);
    }

    async changeEquipo(project: any): Promise<void> {
        this.selectedProject = project;
        this.widgets.widget5.mainChart = this.convertData(await this._isfService.getDashboard(project.idEquipo));
    }

    private convertData(info: any[]) {
        let result: any[] = [];
        if (info.length) {
            for (const elem of info) {
                const nElem: any = {};
                const fechaJo: Date = new Date(Date.parse(elem.fecha));
                nElem.name = fechaJo.getDate() + "/" + fechaJo.getMonth() + "/" + fechaJo.getFullYear();
                nElem.series = [
                    {
                        'name': 'Confirmados',
                        'value': elem.confirmados
                    },
                    {
                        'name': 'Asistencias',
                        'value': elem.asistencia
                    }
                ];

                result.push(nElem);
            }
        }

        return result;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

