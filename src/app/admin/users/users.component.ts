import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { Role } from 'impactdisciplescommon/src/app/shared/lists/roles.enum';
import { AppUser } from 'impactdisciplescommon/src/app/shared/models/admin/user.model';
import { AppUserService } from 'impactdisciplescommon/src/app/shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('grid', { static: false }) grid: DxDataGridComponent;

  dataSource: any;

  selectedRow: any;

  roles: Role[] = [];

  constructor(public userService: AppUserService) {
    this.dataSource = new CustomStore({
      key: 'id',
      loadMode: 'raw',
      load: function (loadOptions: any) {
        return userService.getAll();
      },
      insert: function (value: AppUser) {
        return userService.add(value);
      },
      update: function (key: any, value: AppUser) {
        return userService.update(key, value)
      },
      remove: function (id: any) {
        return userService.delete(id);
      },
    });

    this.roles = [Role.CUSTOMER, Role.EMPLOYEE, Role.ADMIN];
  }

  ngOnInit(): void {}

  onRowUpdating(options) {
    options.newData = Object.assign(options.oldData, options.newData);
  }
}
