import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>BAER ROOM</h1>
  <form>
    <input [value]="name" (input)="name = $event.target.value" type="text" placeholder="Beer Name">
    <input [value]="brand" (input)="brand = $event.target.value" type="text" placeholder="Brand">
    <input [value]="price" (input)="price = $event.target.value" type="text" placeholder="Beer Price">
    <input [value]="abv" (input)="abv = $event.target.value" type="text" placeholder="Beer Alcohol Content">
    <button (click)="addKeg(); clearInputs()">Add Keg</button>
  </form>
  <ul>
    <li *ngFor="let keg of totalKegs"  [class]="keg.priceCheck()">
      <p [class]="keg.abvCheck()">{{keg.name}}, {{keg.brand}}, \${{keg.price}}, {{keg.abv}}%, <span [class]="keg.pintsLow()">{{keg.pints}} Pints Remaining</span></p>
      <button (click)="keg.editKeg(name, brand, price, abv); clearInputs();">Edit</button>
      <button (click)="keg.orderDrink()">Order</button>
    </li>
  </ul>
  `
})

export class AppComponent {
  public totalKegs: Keg[] = [];
  public name: string;
  public brand: string;
  public price: number;
  public abv: number;
  constructor(){
    this.name = "";
    this.brand = "";
    this.price = null;
    this.abv = null;
  }
  addKeg() {
    if(this.name != "" && this.brand != "" && this.price != null && this.abv != null) {
      this.totalKegs.push(new Keg(this.name, this.brand, this.price, this.abv));
    } else {
      this.clearInputs();
      alert("You missed a field");
    }
  }
  clearInputs() {
    this.name = "";
    this.brand = "";
    this.price = null;
    this.abv = null;
  }

}

class Keg {
  constructor(public name: string, public brand: string, public price: number, public abv: number, public pints: number = 124) {}

  editKeg(name, brand, price, abv) {
    if(name != "") {
      this.name = name;
    }
    if(brand != "") {
      this.brand = brand;
    }
    if(price != null) {
      this.price = price;
    }
    if(abv != null) {
      this.abv = abv;
    }
  }

  orderDrink() {
    if(this.pints <= 0) {
      alert(`You're out of ${this.name}`);
    } else {
      this.pints--;
      if(this.pints <= 0) {
        alert(`You're out of ${this.name}`);
      }
    }
  }

  priceCheck() {
    if(this.price <= 5) {
      return "low-cost";
    } else if (this.price <= 8) {
      return "average-cost";
    } else {
      return "expensive-cost";
    }
  }

  abvCheck() {
    if(this.abv < 4) {
      return "low-abv";
    } else if (this.abv < 6) {
      return "average-abv";
    } else {
      return "high-abv";
    }
  }

  pintsLow() {
    if(this.pints <= 10) {
      return "low-pints";
    } else {
      return "supply-good";
    }
  }
}
