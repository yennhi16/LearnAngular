import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Hero } from 'src/app/interface/Hero';
import { Item } from 'src/app/interface/Item';
import { LoadingState } from 'src/app/interface/loading-state';
import { HEROES } from 'src/app/mock/mock-heroes';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent implements OnInit {
  isSpecial = true;
  canSave = true;
  isUnchanged = true;

  isActive = true;
  condition = true;

  styleFontStyle = 'italic';
  styleFontSize = 20;
  test = 'hi i am here';

  nullCustomer: string | null = null;
  items: Item[] = [];
  conditionNgContainer = true;
  color = '';
  colorChildren = '#6751b1';
  conditionUnless = false;
  classColor = 'white';
  heroLoadingState: LoadingState<Hero> = { type: 'loading' };
  violet = 'violet';
  myContext = { $implicit: 'World', name: 'Svet' };

  // currentItem = {
  //   name: '',
  // };
  currentItem!: Item;
  item!: Item;

  products = [
    {
      name: 'apple',
      price: 120,
      discount: true,
    },
    {
      name: 'orange',
      price: 90,
      discount: true,
    },
    {
      name: 'lemons',
      price: 130,
      discount: false,
    },
  ];
  // trackBy change counting
  itemsNoTrackByCount = 0;
  itemsWithTrackByCount = 0;
  itemsWithTrackByCountReset = 0;
  itemIdIncrement = 1;

  currentClasses: Record<string, boolean> = {};
  currentStyles: Record<string, string> = {};

  ngOnInit() {
    this.resetItems();
    // this.setCurrentClasses();
    // this.setCurrentStyles();
    // this.itemsNoTrackByCount = 0;
  }
  setCurrentClasses() {
    return (this.currentClasses = {
      saveable: this.canSave,
      modified: !this.isUnchanged,
      special: this.isSpecial,
    });
  }
  getClass() {
    if (this.isActive) {
      return 'active';
    } else {
      return 'inactive';
    }
  }
  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    return (this.currentStyles = {
      'font-style': this.canSave ? 'italic' : 'normal',
      'font-weight': !this.isUnchanged ? 'bold' : 'normal',
      'font-size': this.isSpecial ? '24px' : '12px',
    });
  }
  //============ ngModel============

  setUppercaseName(name: any) {
    console.log(name);
    this.currentItem.name = name.toUpperCase();
  }
  getValue(event: Event): string {
    console.log('getValue', event.target);
    return (event.target as HTMLInputElement).value;
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log('onInputChange', inputValue);
    // Xử lý giá trị thay đổi
  }

  //================ngIf=====================

  giveNullCustomerValue() {
    this.nullCustomer = 'Kelly';
  }
  //================ngFor=====================
  resetItems() {
    this.items = Item.items.map((item) => item.clone());
    this.currentItem = this.items[0];
    this.item = this.currentItem;
  }
  resetList() {
    this.resetItems();
    this.itemsWithTrackByCountReset = 0;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
  }

  trackByItems(index: number, item: Item): number {
    return item.id;
  }

  changeIds() {
    this.items.forEach((i) => (i.id += 1 * this.itemIdIncrement));
    this.itemsWithTrackByCountReset = -1;
    this.itemsNoTrackByCount = ++this.itemsNoTrackByCount;
    this.itemsWithTrackByCount = ++this.itemsWithTrackByCount;
  }

  clearTrackByCounts() {
    this.resetItems();
    this.itemsNoTrackByCount = 0;
    this.itemsWithTrackByCount = 0;
    this.itemIdIncrement = 1;
  }
  ChangeOneID() {
    // this.items[2].id = 12;
    this.items[2].name = 'wwww';
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
  //============ngSwitch=====================

  onChangeInput(event: any): void {
    console.log('onChangeInput', event);
    console.log('onChangeInput', this.currentItem);
  }
  //=================ngTemplateGuard===================

  onLoadHero(): void {
    this.heroLoadingState = { type: 'loaded', data: HEROES[0] };
  }
  onLoadHero2() {
    this.heroLoadingState = { type: 'loading' };
  }

  // resetItems() {
  //   this.items = Item.items.map((item) => item.clone());
  //   this.currentItem = this.items[0];
  //   this.item = this.currentItem;
  // }
}
