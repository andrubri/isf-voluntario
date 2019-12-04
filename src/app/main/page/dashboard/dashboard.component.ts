import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as shape from 'd3-shape';

import {fuseAnimations} from '@fuse/animations';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {ISFService} from '../../../services/isf.service';
import {Keys} from '@swimlane/ngx-datatable/release/utils';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
    projects: any[] = new Array();
    selectedProject: any;
    widgets: any;
    widgetTotal: any = {};
    widget5: any = {};

    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {ProjectDashboardService} _projectDashboardService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _isfService: ISFService
    ) {
        this.widgetTotal = {
            'chartType': 'line',
            'datasets': [],
            'labels': [],
            'options': {
                'spanGaps': false,
                'legend': {
                    'display': false
                },
                'maintainAspectRatio': false,
                'tooltips': {
                    'position': 'nearest',
                    'mode': 'index',
                    'intersect': false
                },
                'layout': {
                    'padding': {
                        'left': 24,
                        'right': 32
                    }
                },
                'elements': {
                    'point': {
                        'radius': 4,
                        'borderWidth': 2,
                        'hoverRadius': 4,
                        'hoverBorderWidth': 2
                    }
                },
                'scales': {
                    'xAxes': [
                        {
                            'gridLines': {
                                'display': false
                            },
                            'ticks': {
                                'fontColor': 'rgba(0,0,0,0.54)'
                            }
                        }
                    ],
                    'yAxes': [
                        {
                            'gridLines': {
                                'tickMarkLength': 16
                            },
                            'ticks': {
                                'stepSize': 30
                            }
                        }
                    ]
                },
                'plugins': {
                    'filler': {
                        'propagate': false
                    }
                }
            }
        };


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
        this.projects.push({nombre: 'TODOS', idEquipo: 0});
        this.projects = this.projects.concat(await this._isfService.getAllEquipos());
        this.changeEquipo(this.projects[0]);
    }

    async changeEquipo(project: any): Promise<void> {
        this.selectedProject = project;
        if (project.idEquipo == 0) {
            this.widgets.widget5.mainChart = [];
            this.actualizarWidgetGeneral();
        } else {
            this.widgets.widget5.mainChart = this.convertData(await this._isfService.getDashboard(project.idEquipo));
        }
    }

    private async actualizarWidgetGeneral(): Promise<void> {
        const datos = await this._isfService.getDashboardGeneral();
        if (datos) {

            let keys: any[] = [];
            for (const elem of datos) {
                if (keys.indexOf(elem.fecha) === -1) {
                    keys.push(elem.fecha);
                }
            }
            this.widgetTotal.labels = keys;

            this.widgetTotal.datasets = [];
            for (const equipo of this.projects) {
                if (equipo.idEquipo != 0) {
                    const nElem: any = {};
                    nElem.label = equipo.nombre;
                    nElem.fill = 'start';
                    nElem.data = [];
                    for (const key of keys) {
                        let i: number = 0;
                        let encontrado: boolean = false;
                        while (datos.length > i && !encontrado) {
                            if (datos[i].idEquipo == equipo.idEquipo && datos[i].fecha == key) {
                                encontrado = true;
                            } else {
                                i++;
                            }
                        }

                        nElem.data.push((datos[i]) ? datos[i].asistencia : 0);
                    }
                    this.widgetTotal.datasets.push(nElem);
                }
            }

        }
    }


    private convertData(info: any[]) {
        let result: any[] = [];
        if (info.length) {
            for (const elem of info) {
                const nElem: any = {};
                const fechaJo: Date = new Date(Date.parse(elem.fecha));
                nElem.name = fechaJo.getDate() + '/' + (Number(fechaJo.getMonth()) + 1) + '/' + fechaJo.getFullYear();
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

