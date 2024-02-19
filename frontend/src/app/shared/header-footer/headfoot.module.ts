import { NgModule } from "@angular/core";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        RouterModule,
        MatMenuModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
    ]
})
export class HeadFootModule { }