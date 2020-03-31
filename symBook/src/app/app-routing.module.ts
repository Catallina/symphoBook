import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@syb/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('@syb/auth/auth.module').then(m => m.AuthPageModule) },
  {
    path: 'books',
    loadChildren: () => import('@syb/books/books.module').then(m => m.PlacesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'wishlist',
    loadChildren: () => import('@syb/wishlist/wishlist.module').then(m => m.WishlistPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('@syb/not-found/not-found.module').then(m => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
