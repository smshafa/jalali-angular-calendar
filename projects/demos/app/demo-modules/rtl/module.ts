import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CalendarDateFormatter,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { DemoComponent } from './component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { JalaliAdapter } from '../../../../angular-calendar/src/date-adapters/moment/jalali-date-adapter.provider';
import { CalendarJalaliDateFormatter } from '../../../../angular-calendar/src/date-adapters/moment/jalali-date-formatter.provider';

import { registerLocaleData } from '@angular/common';
import localeFa from '@angular/common/locales/fa';
import localeFaExtra from '@angular/common/locales/extra/fa';

registerLocaleData(localeFa);
registerLocaleData(localeFa, localeFaExtra);

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useClass: JalaliAdapter,
      },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarJalaliDateFormatter,
        },
      }
    ),
    DemoUtilsModule,
    RouterModule.forChild([{ path: '', component: DemoComponent }]),
  ],
  declarations: [DemoComponent],
  exports: [DemoComponent],
})
export class DemoModule {}
