import { Injectable } from '@angular/core';
import { Databases, ID } from 'appwrite';
import { from } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { client } from '../../../../lib/appwrite';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  collectionName = 'products';
  dataBase;

  constructor() { 
    this.dataBase = new Databases(client);
  }

  addProduct(product) {
    return from(this.dataBase.createDocument(environment.databaseId, this.collectionName, ID.unique(), product));
  }

}
