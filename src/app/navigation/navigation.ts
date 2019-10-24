import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
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
        icon     : 'home',
        url      : '/actividades',

    },   
     {
        id       : 'Jornadas',
        title    : 'Jornadas',
        translate: 'Jornadas',
        type     : 'item',
        icon     : 'accessibility_new',
        url      : '/jornadas',

    },   
    {
       id       : 'Logistica',
       title    : 'Logistica',
       translate: 'Logistica',
       type     : 'item',
       icon     : 'map',
       url      : '/Logistica',

   }
];
