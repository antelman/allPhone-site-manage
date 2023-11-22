import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SubCategoryComponent } from './sub-category/sub-category.component';
// search module
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent, ProductListComponent, AddProductComponent, ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    NgbModule,
    GalleryModule,
    CKEditorModule,
    NgxDropzoneModule,
    SharedModule
  ],
  exports: [SubCategoryComponent],
  bootstrap: [SubCategoryComponent],
  providers: [
    NgbActiveModal
  ]
})
export class ProductsModule { }
