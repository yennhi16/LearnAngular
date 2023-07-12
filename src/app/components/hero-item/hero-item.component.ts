import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from 'src/app/interface/Hero';
import { HeroService } from 'src/app/service/heroService/hero.service';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss'],
})
export class HeroItemComponent {
  @Input() hero!: Hero;

  @Output() heroDelete = new EventEmitter<Hero>();
  @Output() voted = new EventEmitter<boolean>();

  constructor(private heroService: HeroService) {}
  // heroes: Hero[] = [];

  didvote = false;

  // ngOnInit(): void {
  //   this.getHeroes();
  // }

  // getHeroes(): void {
  //   this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  // }

  delete(hero: Hero): void {
    this.heroDelete.emit(hero);
  }
  handleVoted(vote: boolean): void {
    this.voted.emit(vote);
    this.didvote = true;
  }
}
