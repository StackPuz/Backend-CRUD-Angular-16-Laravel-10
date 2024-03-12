import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { OrderHeaderService } from './OrderHeader.service'
import { Util } from '../../util.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'orderHeader-detail',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">
          <div ngNativeValidate method="post">
            <div class="row">
              <div class="form-group col-md-6 col-lg-4">
                <label for="order_header_id">Id</label>
                <input readonly id="order_header_id" name="id" class="form-control form-control-sm" value="{{orderHeader.id}}" type="number" required />
              </div>
              <div class="form-group col-md-6 col-lg-4">
                <label for="customer_name">Customer</label>
                <input readonly id="customer_name" name="customer_name" class="form-control form-control-sm" value="{{orderHeader.customer_name}}" maxlength="50" />
              </div>
              <div class="form-group col-md-6 col-lg-4">
                <label for="order_header_order_date">Order Date</label>
                <input readonly id="order_header_order_date" name="order_date" class="form-control form-control-sm" value="{{orderHeader.order_date}}" data-type="date" autocomplete="off" required />
              </div>
              <div class="col-12">
                <table class="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let orderHeaderOrderDetail of orderHeaderOrderDetails">
                      <td class="text-center">{{orderHeaderOrderDetail.no}}</td>
                      <td>{{orderHeaderOrderDetail.product_name}}</td>
                      <td class="text-right">{{orderHeaderOrderDetail.qty}}</td>
                      <td class="text-center">
                        <a class="btn btn-sm btn-primary" routerLink="/orderDetail/edit/{{orderHeaderOrderDetail.order_id}}/{{orderHeaderOrderDetail.no}}" title="Edit"><i class="fa fa-pencil"></i></a>
                        <a class="btn btn-sm btn-danger" href="#!" (click)="deleteItem($event, '/orderDetails/' + orderHeaderOrderDetail.order_id + '/' + orderHeaderOrderDetail.no)" title="Delete"><i class="fa fa-times"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a class="btn btn-sm btn-primary" (click)="util.goto($event)" href="/orderDetail/create?order_detail_order_id={{orderHeader.id}}">Add</a>
                <hr />
              </div>
              <div class="col-12">
                <a class="btn btn-sm btn-secondary" (click)="util.goBack('/orderHeader', $event)" routerLink="/orderHeader">Back</a>
                <a class="btn btn-sm btn-primary" [queryParams]="{ ref: util.getRef('/orderHeader') }" routerLink="/orderHeader/edit/{{orderHeader.id}}">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
})
export class OrderHeaderDetail {
  
  orderHeader?: any = {}
  orderHeaderOrderDetails?: any[]
  constructor(private route: ActivatedRoute, private OrderHeaderService: OrderHeaderService, private http: HttpClient, public util: Util) { }
  
  ngOnInit() {
    this.get().add(() => {
      setTimeout(() => { this.util.initView(true) })
    })
  }

  get() {
    return this.OrderHeaderService.get(this.route.snapshot.params['id']).subscribe(data => {
      this.orderHeader = data.orderHeader
      this.orderHeaderOrderDetails = data.orderHeaderOrderDetails
    })
  }
  
  deleteItem(e: Event, url: string) {
    e.preventDefault()
    if (confirm('Delete this item?')) {
      this.http.delete(url).subscribe(() => {
        this.get()
      }, (e: any) => {
        alert(e.error.message)
      })
    }
  }
}