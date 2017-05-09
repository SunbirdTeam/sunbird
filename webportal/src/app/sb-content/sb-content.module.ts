import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {SearchComponent} from './search/search.component';
import {ContentService} from '../services/index';
import {ContentRoutingModule} from './sb-content-routing.module';
import { NgSemanticModule } from "ng-semantic";
@NgModule({
    declarations: [
        SearchComponent

    ],
    exports: [SearchComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ContentRoutingModule,
        NgSemanticModule
        
    ],
    providers: [ContentService]
})
export class ContentModule {}
