import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class UserModule {}
