import {NgModule} from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SpinnerModule} from 'primeng/spinner';
import {ToastModule} from 'primeng/toast';

@NgModule({
    exports: [    
        ButtonModule,
        InputTextModule,
        SpinnerModule,
        ToastModule
        ]
})
export class GlobalComponentsModule {}