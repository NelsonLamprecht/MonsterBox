import {NgModule} from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SpinnerModule} from 'primeng/spinner';

@NgModule({
    exports: [    
        ButtonModule,
        InputTextModule,
        SpinnerModule    
        ]
})
export class GlobalComponentsModule {}