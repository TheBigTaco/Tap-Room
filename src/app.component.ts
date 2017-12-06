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
  constructor(){
    this.name = "";
    this.brand = "";
    this.price = null;
    this.abv = null;
    this.style = "IPA";
    this.search = "all";
  }
  addKeg() {
    if(this.name != "" && this.brand != "" && this.price != null && this.abv != null) {
      this.totalKegs.push(new Keg(this.name, this.brand, this.price, this.abv, this.style));
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
}

class Keg {
  public selectedOrder: string = "pint";
  public search: boolean = true;
  constructor(public name: string, public brand: string, public price: number, public abv: number, public style: string, public pints: number = 124) {}

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

  orderDrink(selectedOrder) {
    if(this.pints <= 0) {
      alert(`You're out of ${this.name}`);
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
      alert(`You're out of ${this.name}`);
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
