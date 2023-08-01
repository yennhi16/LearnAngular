import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { ParantComponentComponent } from './components/interactionComponents/parant-component/parant-component.component';
import { ParentComponent } from './components/directives/parent/parent.component';
import { MainComponent } from './components/RxJS/main/main.component';
import { OperatorMapComponent } from './components/RxJS/operator-map/operator-map.component';
import { ReactiveFormComponent } from './components/forms/reactive-form/reactive-form.component';
import { TemplateFormComponent } from './components/forms/template-form/template-form.component';
import { CounterComponent } from './components/ngRx/counter/counter.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'interaction-component', component: ParantComponentComponent },
  { path: 'directives', component: ParentComponent },
  { path: 'rxJS', component: MainComponent },
  { path: 'operator', component: OperatorMapComponent },
  { path: 'reactive-forms', component: ReactiveFormComponent },
  { path: 'template-forms', component: TemplateFormComponent },
  { path: 'ngRx', component: CounterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
