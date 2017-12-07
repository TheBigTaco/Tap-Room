import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `src/app.component.html`,
})

export class AppComponent {
  public totalKegs: Keg[] = [];
  public name: string;
  public brand: string;
  public price: number;
  public abv: number;
  public style: string;
  public search: string;
  public happyHour: boolean = false;
  public notHappyHour: boolean = true;
  constructor(){
    this.name = "";
    this.brand = "";
    this.price = null;
    this.abv = null;
    this.style = "IPA";
    this.search = "all";
    setInterval(function(){
      if(this.happyHour) {
        this.endHappyHour();
      } else {
        this.startHappyHour();
      }
    }.bind(this), 6000000);
  }
  addKeg() {
    if(this.name != "" && this.brand != "" && this.price != null && this.abv != null) {
      this.totalKegs.push(new Keg(this.name, this.brand, this.price, this.abv, this.style));
    } else {
      this.clearInputs();
      alert("You missed a field");
    }
  }
  deleteKeg(keg) {
    let indexer = this.totalKegs.indexOf(keg);
    this.totalKegs.splice(indexer, 1);
  }
  clearInputs() {
    this.name = "";
    this.brand = "";
    this.price = null;
    this.abv = null;
    this.style = "IPA";
  }
  filter() {
    let mySearch = this.search;
    this.totalKegs.forEach(function(keg){
      if(mySearch === "all") {
        keg.search = true;
      } else {
        if(mySearch === keg.style) {
          keg.search = true;
        } else {
          keg.search = false;
        }
      }
    })
  }

  startHappyHour() {
    this.happyHour = true;
    this.notHappyHour = false;
    this.totalKegs.forEach(function(keg){
      console.log(keg.oldPrice);
      console.log(keg.price);
      if(keg.oldPrice != null) {
        keg.price = keg.oldPrice;
        keg.oldPrice = null;
      }
      keg.oldPrice = keg.price;
      keg.price = keg.price - (keg.price * .5);
      keg.offSale = false;
      keg.onSale = false;
      console.log(keg.oldPrice);
      console.log(keg.price);
    })
  }
  endHappyHour() {
    this.happyHour = false;
    this.notHappyHour = true;
    this.totalKegs.forEach(function(keg){
      keg.price = keg.oldPrice;
      keg.oldPrice = null;
      if(keg.sale != null) {
        keg.oldPrice = keg.price;
        keg.price = keg.price - (keg.price * keg.sale / 100);
        keg.offSale = false;
        keg.onSale = true;
      } else {
        keg.offSale = true;
        keg.onSale = false;
      }
    })
  }
}

export class Keg {
  public selectedOrder: string = "pint";
  public search: boolean = true;
  public sale: number = null;
  public onSale: boolean = false;
  public offSale: boolean = true;
  public oldPrice: number = null;
  public empty: boolean = false;
  constructor(public name: string, public brand: string, public price: number, public abv: number, public style: string, public pints: number = 124) {}

  refill() {
    this.pints = 124;
    this.empty = false;
  }

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
  putOnSale() {
    this.oldPrice = this.price;
    this.price = this.price - (this.price * this.sale / 100);
    this.onSale = true;
    this.offSale = false;
  }
  takeOffSale() {
    this.price = this.oldPrice;
    this.oldPrice = null;
    this.onSale = false;
    this.offSale = true;
    this.sale = null;
  }
  orderDrink(selectedOrder) {
    if(this.pints <= 0) {
      alert(`You're out of ${this.name}`);
      this.empty = true;
    } else if(selectedOrder === "pint") {
      this.pints--;
    } else if(selectedOrder === "growler" && this.pints >= 2) {
      this.pints -= 2;
    } else if(selectedOrder === "large-growler" && this.pints >= 4) {
      this.pints -= 4;
    } else {
      alert(`You don't have enough ${this.name} to a ${selectedOrder}`);
    }
    if(this.pints <= 0) {
      this.empty = true;
      alert(`You're out of ${this.name}`);
    }
  }

  priceCheck() {
    if(this.onSale) {
      return "on-sale";
    } else {
      if(this.price <= 5) {
        return "low-cost";
      } else if (this.price <= 8) {
        return "average-cost";
      } else {
        return "expensive-cost";
      }
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
