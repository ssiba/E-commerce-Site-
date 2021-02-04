import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { MatTableDataSource } from '@angular/material/table';
import { concat } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
export interface PeriodicElement {
  description: string,
  id: number,
  image: string,
  name: string,
  price: number,
  quantity: number

}
const dataSource: PeriodicElement[] = [];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'e-commerceApp';
  dataSource: any[] = [];
  displayedColumns: string[] = ['id', 'description', 'image', 'price', 'quantity', 'action'];
  cartList: any[] = [];
  cartProducts: any[] = [];
  totalCartPrice: any;
  shown = [];

  constructor(
    private apiservice: ApiService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.apiservice.getApiData()
      .subscribe((res: any) => {
        console.log(res);
        let data = (res.data).map(x => {
          x.isAddedToCart = false;
          return x
        }); 
        this.dataSource = data
      });
  }
  addProductToCart(productData: any) {
    console.log(productData);
    let selectedProductIndex = this.dataSource.findIndex(x => x.id == productData.id);
    if (selectedProductIndex != -1) {
      this.dataSource[selectedProductIndex].isAddedToCart = !this.dataSource[selectedProductIndex].isAddedToCart;
      console.log(this)
    }

  }
  openDialog() {
    let cartProducts = this.dataSource.filter(x=>x.isAddedToCart == true);
    cartProducts = cartProducts.map(x=>{
      let productPrice = parseFloat(x.price)
      let productQty = parseFloat(x.quantity);
      x.productTotalPrice = (productPrice * productQty).toFixed(2);
      return x;
    });
    this.cartProducts = cartProducts;
    this.totalCartPrice = cartProducts.map(x=>x.productTotalPrice).reduce((totalVal, currentVal)=>{
      let totalProductVal = parseFloat(totalVal || '0');
      let currentProdPrice = parseFloat(currentVal);
      return(totalProductVal + currentProdPrice).toFixed(2);
    })
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      data: {cardProducts: this.cartProducts, totalPrice: this.totalCartPrice}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
