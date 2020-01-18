import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './components/login/login.component';
import { PageAuthenticateComponent } from './page-authenticate.component';

@NgModule({
    declarations: [PageAuthenticateComponent, LoginComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        AngularFireAuthModule,
    ],
})
export class PageAuthenticateModule {}
