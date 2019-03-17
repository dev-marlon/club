import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
    ],
})
export class MaterialModule {}
