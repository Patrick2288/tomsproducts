import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTrashAlt, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatCardModule, MatFormFieldModule,MatInputModule, MatToolbarModule, MatListModule, MatProgressSpinnerModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { RouterModule, Routes} from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { NotificationService } from './shared/notification.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { DisplayClipartComponent } from './display-clipart/display-clipart.component';
import { FlexLayoutModule } from '@angular/flex-layout';

library.add(faStar);
library.add(faTrashAlt);
library.add(faCoffee);

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full', canActivate: [AuthGuard]},
   { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard]},
   { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
   { path: 'home', component: ProductListComponent, canActivate: [AuthGuard]},
   { path: 'login', component: LoginComponent},
   { path: 'signup', component: SignupComponent},
   { path: '**', redirectTo: 'login', canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarRatingComponent,
    AddProductComponent,
    LoginComponent,
    NavbarComponent,
    NotificationsComponent,
    SignupComponent,
    DisplayClipartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthService, AuthGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
