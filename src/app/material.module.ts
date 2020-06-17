import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  MatButtonModule } from '@angular/material/button';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatInputModule } from '@angular/material/input';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  MatCardModule } from '@angular/material/card';
import {  MatMenuModule } from '@angular/material/menu';
import {  MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  imports: [  MatButtonModule,
              MatCheckboxModule,
              MatToolbarModule,
              MatInputModule,
              MatProgressSpinnerModule,
              MatCardModule,
              MatMenuModule,
              MatIconModule,
              MatExpansionModule,
              MatSidenavModule,
              MatTableModule,
              MatGridListModule],
  exports: [  MatButtonModule,
              MatCheckboxModule,
              MatToolbarModule,
              MatInputModule,
              MatProgressSpinnerModule,
              MatCardModule,
              MatMenuModule,
              MatIconModule,
              MatExpansionModule,
              MatSidenavModule,
              MatTableModule,
              MatGridListModule]
})


export class MaterialModule{ }
