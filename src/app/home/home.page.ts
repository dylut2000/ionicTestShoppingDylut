import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  products = [];
  cart = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    console.log(this.products)
  }


  addCart(product) {
    this.animateCss('tada');
    this.cartService.addProduct(product);
  }

  async openCart() {

    this.animateCss('bounceOutLeft', true);
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft');
      this.animateCss('bounceInLeft');
    });
    modal.present();
  }


  animateCss(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }
}
