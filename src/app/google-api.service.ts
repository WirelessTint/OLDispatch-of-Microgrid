import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:'416825179249-nj5it99sh2tvr4hbch87src3vnhghf3m.apps.googleusercontent.com',
  scope: 'openid profile email'
}
export interface UserInfo {
  info: {
    sub: string
    email: string,
    name: string,
    picture: string
  }
}
@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  userProfileSubject = new Subject<UserInfo>()
  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig)
    oAuthService.logoutUrl = 'https://www.google.com/accounts/Logout'
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
  if(!oAuthService.hasValidAccessToken())
  {
    oAuthService.initLoginFlow()
  } else {
    oAuthService.loadUserProfile().then( (userProfile)=> {
      this.userProfileSubject.next(userProfile as UserInfo)
    })
  }
      })
    })
  }
  isLoggedIn(): boolean{
    return this.oAuthService.hasValidAccessToken()
  }
  signOut() {
    this.oAuthService.logOut()
  }
}

