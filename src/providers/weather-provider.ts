import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {
    data: any;
    apikey: string;
    private baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
    private forecastbaseUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    constructor(public http: Http) {
        console.log('Hello WeatherProvider Provider');
        this.apikey = 'b6ec8bb9a7f022519c5e6b642487c581'
    }
    getCountryUS() {
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get('https://restcountries.eu/rest/v1/name/united')
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }
    getWeather(param: string) {
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get(this.baseUrl + param + '&appId=' + this.apikey + '&units=metric')
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }
    getforecast(city: string, countrycode: string) {
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get(this.forecastbaseUrl + city + ',' + countrycode + '&appId=' + this.apikey+'&units=metric')
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
        // {city name},{country code}
    }
}
