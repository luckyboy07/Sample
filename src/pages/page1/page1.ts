import { Component } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather-provider';
import * as async from 'async';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {
    weathers: Array < any > ;
    display: boolean;
    city: string;
    countrycode: string;
    days: Array < any > ;
    constructor(public navCtrl: NavController, public loadData: WeatherProvider, public loadingCtrl: LoadingController) {
        this.weathers = [];
    }
    ionViewDidLoad() {
        // this.loadData.getWeather().then((value:any)=>{
        // 	let str = JSON.parse(value._body);
        // 	// console.log('str:',str[0]);
        // 	console.log('str:',str);
        // 	console.log('value:',value);
        // })
    }
    public presentLoadingDefault(param) {
        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present();

        setTimeout(() => {
            async.waterfall([
                (callback) => {
                    this.loadData.getWeather(param).then((value: any) => {
                        if (value.status == 200) {
                            this.display = true;
                            let parse = JSON.parse(value._body);
                            this.weathers = parse;
                            this.city = parse.name;
                            this.countrycode = parse.sys.country;
                            console.log('this.weathers:', this.weathers);
                            callback(null, this.city, this.countrycode);
                        }
                    });
                }, (city, countrycode, callback) => {
                    this.loadData.getforecast(city, countrycode).then((value: any) => {
                        this.display = true;
                        _.each(value.list, (row: any) => {
                            _.some(row.weather, (row2) => {
                                row2.icon = 'http://openweathermap.org/img/w/' + row2.icon + '.png'
                            });
                            row.date_created = moment(row.dt_txt).format('YYYY-DD-MM')
                        })
                        let groupby = _.groupBy(value.list, 'date_created');
                        let list = [];
                        _.each(groupby, (row, key) => {
                            list.push({
                                date: moment(row[0].dt_txt).format("ddd"),
                                data: row[0]
                            });
                        })
                        this.days = list;
                        console.log('list:', list);
                        callback();
                    });
                }
            ])


            loading.dismiss();
        }, 5000);
    }

    getItems(event) {
        console.log('sad:', event)
        this.presentLoadingDefault(event.target.value)

    }
    opendetail(item:any){
    	console.log('item:',item);
    }
    onCancel(event){
    	console.log('event:',event);
    }
}
