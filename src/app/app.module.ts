import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TrigonometryDirective } from './directive/trigonometry.directive';
import { MainComponent } from './components/RxJS/main/main.component';
import { OperatorMapComponent } from './components/RxJS/operator-map/operator-map.component';
import { ReactiveFormComponent } from './components/forms/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './components/forms/template-form/template-form.component';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './components/ngRx/counter/counter.component';
import { couterReducer } from './store/reducer/couter.reducer';
import { BookItemComponent } from './components/ngRx/book-item/book-item.component';
import { BookCollectionComponent } from './components/ngRx/book-collection/book-collection.component';
import { bookReducer } from './store/reducer/book.reducer';
import { bookListReducer } from './store/reducer/bookList.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './store/reducer/user.reducer';
import { UserEffects} from './store/effects/login.effects';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    TrigonometryDirective,
    MainComponent,
    OperatorMapComponent,
    ReactiveFormComponent,
    TemplateFormComponent,
    CounterComponent,
    BookItemComponent,
    BookCollectionComponent,
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
    ReactiveFormsModule,
    StoreModule.forRoot(
      { count: couterReducer, books: bookListReducer, collection: bookReducer, user: userReducer },
      
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([UserEffects]),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
