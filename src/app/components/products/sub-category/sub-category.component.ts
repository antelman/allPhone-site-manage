import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CATEGORY, Category } from 'src/app/shared/tables/category';
import { NgbdSortableHeader } from '../../../shared/directives/NgbdSortableHeader';
import { TableService } from '../../../shared/service/table.service';
import { CategoriesService } from '../category/categories.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [TableService, DecimalPipe],
})
export class SubCategoryComponent {
  public closeResult: string;
  searchText;
  tableItem$: Observable<Category[]>;
  total$: Observable<number>;

  categoryDB;
  subCategoryName: string;
  subCategoryParent: string;
  categories = [];
  subCategories = [];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private categoriesService: CategoriesService
  ) {
    this.tableItem$ = service.tableItem$;
    this.total$ = service.total$;
    this.service.setUserData(CATEGORY);
  }

  onSort({ column, direction }) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          console.info(this.closeResult);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.info(this.closeResult);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.categoriesService.fetchSubCategories().subscribe({
      next: res => {
        this.subCategories = res['documents'];
        console.log(res);
      },
      error: error => {
        console.log(error);
      },
    });
    this.categoriesService.getAllCategories().subscribe({
      next: res => {
        this.categories = res['documents'];
        console.log(res);
      },
      error: error => {
        console.log(error);
      },
    });

    //   client.subscribe([`databases.${environment.dbName}.collections.${this.categoriesService.collectionName}.documents`], response => {
    //     // Callback will be executed on changes for documents A and all files.
    //     console.log(response);
    // });
  }

  addSubCategory(dialog) {
    const subCategory = {
      subCategoryName: this.subCategoryName,
      categories: this.subCategoryParent,
    };
    this.categoriesService.addSubCategory(subCategory).subscribe({
      next: res => this.subCategories.push(res),
      error: err => console.log(err),
    });
    dialog.dismiss('Save click');
  }
}
