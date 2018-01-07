import {
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ChatExampleData} from './data/chat-example-data';

import {UsersService} from './user/users.service';
import {ThreadsService} from './thread/threads.service';
import {MessagesService} from './message/messages.service';
import {JsonParserService} from './parser/json-parser.service';
import {PopupComponent} from "./popup/popup.component";
import {PopupService} from "./popup/popup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JsonParserService]
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild(
    "popupContainer", {
      read: ViewContainerRef
    }
  ) popupContainer;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService,
              public parser: JsonParserService,
              private resolver: ComponentFactoryResolver,
              public popupService: PopupService,
              private cdRef:ChangeDetectorRef) {
    ChatExampleData.init(messagesService, threadsService, usersService, popupService);
    console.log(parser.parse());
  }

  ngAfterViewInit() {
    console.log('afterview');

    // let elem3: Element = document.getElementById("button1");
    // console.log(elem3.id);
    // console.log(elem3.className);
    this.popupService.popupComponent = this.createComponent();
  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  popup(){
    this.popupService.pop();
  }

  createComponent() {
    this.popupContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(PopupComponent);
    return this.popupContainer.createComponent(factory).instance;
  }
}
