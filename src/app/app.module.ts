import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieModule } from 'ngx-cookie';

import { UsersService } from './user/users.service';
import { ThreadsService } from './thread/threads.service';
import { MessagesService } from './message/messages.service';
import { APP_INITIALIZER } from '@angular/core';
import {Config} from "./util/config"
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import {PopupComponent} from "./popup/popup.component";
import { OverlayComponent } from './overlay/overlay.component';
import { CookieTestComponent } from './cookie-test/cookie-test.component';
import { CookiesHandlerService } from './cookies-handler/cookies-handler.service';
import { PagingComponent } from './paging/paging.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatThreadComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatPageComponent,
    FromNowPipe,
    PopupComponent,
    OverlayComponent,
    CookieTestComponent,
    PagingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CookieModule.forRoot()
  ],
  providers: [
    MessagesService, ThreadsService, UsersService,
    Config,
    CookiesHandlerService,
    { provide: APP_INITIALIZER, useFactory: useFactory, deps: [Config], multi: true }
  ],

  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent]
})
export class AppModule { }

export function useFactory(config: Config) {
  return  () => config.load();
}

