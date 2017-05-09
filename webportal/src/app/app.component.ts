import {Component, OnInit} from '@angular/core';
import {ContentService} from './services/index';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private contentService: ContentService) {}
    title = 'app works!';
    ngOnInit() {
        this.contentService.contentSearch({"filters":{"status":["Live"]}})
            .subscribe(result => {
                if (result) {
                    console.log(result);
                } else {

                }
            }
            );
    }
}
