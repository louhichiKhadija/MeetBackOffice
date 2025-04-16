import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { MeetingService } from '../services/meeting.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    display: boolean = false;
    link: string = "";

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private meetinService : MeetingService) { }

    getMeetLink(): void{
        this.meetinService.createMeetingLink().subscribe(
            next => {
                this.display = true;
                this.link = next.url;
            },
        )  
    }

    copyToClipboard(): void{
        navigator.clipboard.writeText(this.link).then(() => {
            console.log("Copied to clipboard!");
        }).catch(err => {
        console.error("Failed to copy: ", err);
    });
    }
}
