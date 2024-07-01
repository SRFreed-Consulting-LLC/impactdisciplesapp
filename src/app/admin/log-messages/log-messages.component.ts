import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { LogMessage } from 'impactdisciplescommon/src/app/shared/models/utils/log-message.model';
import { LoggerService } from 'impactdisciplescommon/src/app/shared/services/logger.service';

@Component({
  selector: 'app-log-messages',
  templateUrl: './log-messages.component.html',
  styleUrls: ['./log-messages.component.css']
})
export class LogMessagesComponent implements OnInit {

  dataSource: any;

  constructor(logService: LoggerService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return logService.getAll();
      },
      insert: function (value: LogMessage) {
        return logService.add(value);
      },
      update: function (key: any, value: LogMessage) {
        return logService.update(key, value)
      },
      remove: function (id: any) {
        return logService.delete(id);
      },
    });
   }

  ngOnInit() {
  }

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }

}
