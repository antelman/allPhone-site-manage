import { Injectable } from '@angular/core';
import { Databases, ID, Query } from 'appwrite';
import { from } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { client } from '../../../../lib/appwrite';
import { UserQuery } from '../../auth/state/user.query';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  dataBase;
  collectionName = 'categories';

  constructor(private userQuery: UserQuery) {
    this.dataBase = new Databases(client);
  }


  getAllCategories() {
    return from(this.dataBase.listDocuments(environment.databaseId, 'categories'));
  }

  addCategory(categoryName: string) {

    const data = {
      categoryName,
      createdBy: this.userQuery.getUserName()
    }

    return from(this.dataBase.createDocument(environment.databaseId, this.collectionName, ID.unique(), data));
  }

  fetchSubCategories() {
    return from(this.dataBase.listDocuments(environment.databaseId, 'subCategories')); 
  }

  fetchSubCategoriesById(category: string) {
    return from(this.dataBase.listDocuments(environment.databaseId, 'subCategories', [Query.equal('categories', [category])])); 
  }

  addSubCategory(subCategory) {

    const data = {
      ...subCategory,
      createdBy: this.userQuery.getUserName()
    }

    return from(this.dataBase.createDocument(environment.databaseId, 'subCategories', ID.unique(), data));
  }
}
