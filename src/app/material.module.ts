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

@NgModule({
  imports: [  MatButtonModule,
              MatCheckboxModule,
              MatToolbarModule,
              MatInputModule,
              MatProgressSpinnerModule,
              MatCardModule,
              MatMenuModule,
              MatIconModule,
              MatExpansionModule],
  exports: [  MatButtonModule,
              MatCheckboxModule,
              MatToolbarModule,
              MatInputModule,
              MatProgressSpinnerModule,
              MatCardModule,
              MatMenuModule,
              MatIconModule,
              MatExpansionModule]
})


export class MaterialModule{ }