import { OCR } from '@ionic-native/ocr/ngx';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ImagePickerComponent } from '@syb/shared/components/image-picker/image-picker.component';
import { FooterPlayerPage } from '@syb/shared/footer-player/footer-player.page';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FooterPlayerPage,
    ImagePickerComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterPlayerPage,
    ImagePickerComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ],
  providers: [
    OCR,
  ]
})
export class SharedModule { }
