import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, ButtonModule, CardModule, FormModule, GridModule, PaginationModule, TableModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { BlackOfferService } from 'src/app/services/black-offer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule,
    TableModule,
    PaginationModule,
    FormsModule,
    FormModule,
    ButtonModule,
    IconsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [BlackOfferService]
})
export class ChartsModule {
}
