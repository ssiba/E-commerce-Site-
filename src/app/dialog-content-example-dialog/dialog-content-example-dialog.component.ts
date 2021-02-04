import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.scss']
})
export class DialogContentExampleDialogComponent implements OnInit {
  cardProducts: any[];
  totalPrice: any;
  dataSource: any[] = [];
  displayedColumns: string[] = ['name', 'quantity', 'price','subtotal'];
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // this.cardProducts = this.data.cardProducts;
    this.dataSource = this.data.cardProducts;

    console.log(this);
    this.totalPrice = this.data.totalPrice
    // console.log(this.totalPrice);
  }
  totalPrice1(){    
    this.totalPrice = this.data.totalPrice
    console.log(this.totalPrice);
  }

  changeQty(productData, event){
    // console.log(i, event);
    let productQty = parseFloat(event.target.value);
    let productPrice = parseFloat(productData.price)
    let productTotalPrice = (productPrice * productQty).toFixed(2);
    productData.quantity = productQty;
    productData.productTotalPrice = productTotalPrice;

    let productIndex = this.dataSource.findIndex(x=>x.id == productData.id)
    this.dataSource.splice(productIndex, 1, productData);

    this.refreshTotalPrice();
  };

  refreshTotalPrice(){
    let totalPrice = this.dataSource.map(x=>x.productTotalPrice).reduce((totalVal, currentVal)=>{
      let totalProductVal = parseFloat(totalVal || '0');
      let currentProdPrice = parseFloat(currentVal);
      return(totalProductVal + currentProdPrice).toFixed(2);
    });
    this.totalPrice = totalPrice;
  }
}
