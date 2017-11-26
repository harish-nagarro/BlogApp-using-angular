import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ViewContainerRef} from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TilesListComponent } from './tiles-list/tiles-list.component';
import {TileServiceService} from './tile-service.service';
import {HttpModule} from '@angular/http';
import { AddPostComponent } from './add-post/add-post.component';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {PostDataService} from './post-data.service';
import { TileDetailsComponent } from './tile-details/tile-details.component';
import { LogInComponent } from './log-in/log-in.component';
import { FilterBlogsPipe } from './filter-blogs.pipe';
import { SortPipe } from './sort.pipe';
import { FavouritesPipe } from './favourites.pipe';
import {ToastModule, ToastOptions, ToastsManager} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CategoryPipe } from './category.pipe';


const appRoutes = [
  {path: 'home/:id', component: HomeComponent },
  {path: 'home', redirectTo: '/home/all', pathMatch: 'full' },
  {path: 'add_post', component: AddPostComponent, pathMatch: 'full' },
  {path: 'tile/:id', component: TileDetailsComponent, pathMatch: 'full' },
  {path: 'logIn', component: LogInComponent, pathMatch: 'full' },
  {path: '', redirectTo: '/home/all', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TilesListComponent,
    AddPostComponent,
    HomeComponent,
    TileDetailsComponent,
    LogInComponent,
    FilterBlogsPipe,
    SortPipe,
    FavouritesPipe,
    CategoryPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    TileServiceService,
    PostDataService,
    ToastsManager,
    ToastOptions
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
