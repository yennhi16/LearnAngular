import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/inMemoryDataService/in-memory-data.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { ChildComponentComponent } from './components/interactionComponents/child-component/child-component.component';
import { ParantComponentComponent } from './components/interactionComponents/parant-component/parant-component.component';
import { MissionControlComponent } from './components/interactionComponents/mission-control/mission-control.component';
import { AstronautComponent } from './components/interactionComponents/astronaut/astronaut.component';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { ParentComponent } from './components/directives/parent/parent.component';
import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';
import { IfLoadedDirective } from './directive/if-loaded.directive';
import { ChildComponent } from './components/directives/child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    ChildComponentComponent,
    ParantComponentComponent,
    MissionControlComponent,
    AstronautComponent,
    HeroItemComponent,
    ParentComponent,

    UnlessDirective,
    IfLoadedDirective,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    HighlightDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
