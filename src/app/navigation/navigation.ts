import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'Dashboard',
        title    : 'Dashboard',
        translate: 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard',

    },
    {
        id       : 'Usuarios',
        title    : 'Usuarios',
        translate: 'Usuarios',
        type     : 'item',
        icon     : 'person',
        url      : '/users',

    },    {
        id       : 'Equipos',
        title    : 'Equipos',
        translate: 'Equipos',
        type     : 'item',
        icon     : 'group',
        url      : '/equipos',

    },   
     /* {
        id       : 'Jornadas',
        title    : 'Jornadas',
        translate: 'Jornadas',
        type     : 'item',
        icon     : 'home',
        url      : '/jornadas',

    },    */
     {
        id       : 'Personas',
        title    : 'Personas',
        translate: 'Personas',
        type     : 'item',
        icon     : 'accessibility_new',
        url      : '/personas',

    },   
    /* {
       id       : 'Logistica',
       title    : 'Logistica',
       translate: 'Logistica',
       type     : 'item',
       icon     : 'map',
       url      : '/Logistica',

   } */
];
