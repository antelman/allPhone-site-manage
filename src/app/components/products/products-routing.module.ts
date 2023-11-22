import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'category',
        component: CategoryComponent,
        data: {
          title: 'קטגוריה',
          breadcrumb: 'קטגוריה'
        }
      },
      {
        path: 'sub-category',
        component: SubCategoryComponent,
        data: {
          title: 'תת קטגוריה',
          breadcrumb: 'תת קטגוריה'
        }
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        data: {
          title: 'רשימת מוצרים',
          breadcrumb: 'רשימת מוצרים'
        }
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent,
        data: {
          title: 'פרטי מוצר',
          breadcrumb: 'פרטי מוצר'
        }
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        data: {
          title: 'הוספת מוצר',
          breadcrumb: 'הוספת מוצר'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
