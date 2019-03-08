import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultComponent} from './components/result/result.component';
import {QuestionComponent} from './components/question/question.component';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'result', component: ResultComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
