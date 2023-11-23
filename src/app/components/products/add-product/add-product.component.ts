import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoriesService } from '../category/categories.service';
import { ProductsService } from '../state/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public productForm: UntypedFormGroup;
  public Editor = ClassicEditor;
  public counter = 1;
  public url = [
    {
      img: 'assets/images/user.png',
    },
    {
      img: 'assets/images/user.png',
    },
    {
      img: 'assets/images/user.png',
    },
    {
      img: 'assets/images/user.png',
    },
    {
      img: 'assets/images/user.png',
    },
  ];

  categories = [];
  subCategories = [];

  constructor(
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$'),
        ],
      ],
      catalogNumber: [''],
      description: [''],
      categories: [null, Validators.required],
      subCategories: [null, Validators.required],
    });

    this.productForm.get('subCategories').disable();

    this.productForm.get('categories').valueChanges.subscribe(x => {
      if (x) {
        this.categoriesService.fetchSubCategoriesById(x).subscribe(res => {
          this.productForm.get('subCategories').enable();
          this.subCategories = res['documents'];
        });
      }
    });

    this.categoriesService.getAllCategories().subscribe({
      next: res => {
        this.categories = res['documents'];
        console.log(this.categories);
      },
      error: error => {
        console.log(error);
      },
    });
  }

  addProduct() {
    this.productsService.addProduct(this.productForm.value).subscribe({
      next: res => console.log(res),
      error: res => console.log(res),
    });
    console.log(this.productForm.value);
  }
  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = _event => {
      this.url[i].img = reader.result.toString();
    };
  }

  ngOnInit() {}
}
