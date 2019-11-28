/// <reference types="@types/googlemaps" />
import { Injectable, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Injectable({
    providedIn: 'root',
})
export class AutocompleteService {

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}


    public autocompleteAdress(element,location) {
        this.mapsAPILoader.load().then(
            () => {
                let autocomplete = new google.maps.places.Autocomplete(element, { types: ["address"] });

                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        let place : google.maps.places.PlaceResult = autocomplete.getPlace();
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }

                        location.lat = place.geometry.location.lat();
                        location.lng = place.geometry.location.lng();
                        
                    });
                });
            }
        );
    }
    
}