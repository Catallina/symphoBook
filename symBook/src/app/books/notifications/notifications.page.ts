import { Component, OnInit } from '@angular/core';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'syb-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  
  public isAndroid = true;
  public key;

  constructor(
    private localNotifications: LocalNotifications,
  ) { }

  ngOnInit() {

        // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: this.isAndroid ? 'file://sound.mp3': 'file://beep.caf',
      data: { secret: this.key }
    });


    // Schedule multiple notifications
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      sound: this.isAndroid ? 'file://sound.mp3': 'file://beep.caf',
      data: { secret:this.key }
      },{
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);


    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });
  }

  single_notification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key_data' }
    });
  }

}