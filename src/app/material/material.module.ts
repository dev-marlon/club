import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
})
export class MaterialModule {}
