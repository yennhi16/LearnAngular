// import { HeroItemComponent } from './../hero-item/hero-item.component';
import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Hero } from 'src/app/interface/Hero';
// import { Hero } from 'src/app/Hero';
import { HEROES } from 'src/app/mock/mock-heroes';
import { HeroService } from 'src/app/service/heroService/hero.service';
import { MessageService } from 'src/app/service/messageService/message.service';
import { HeroItemComponent } from '../hero-item/hero-item.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [HeroService],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  like = 0;
  dislike = 0;

  constructor(private heroService: HeroService) {}
  @ViewChildren(HeroItemComponent) heroItems!: QueryList<HeroItemComponent>;

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  onVote(voted: boolean): void {
    if (voted) {
      this.like++;
    } else {
      this.dislike++;
    }
  }
  handleClear(): void {
    console.log(this.heroItems);
    this.heroItems.forEach((heroItem: HeroItemComponent) => {
      heroItem.didvote = false;
    });
    this.like = 0;
    this.dislike = 0;
  }
}
