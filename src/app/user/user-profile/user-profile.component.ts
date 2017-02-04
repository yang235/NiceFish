import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Base } from './field/base';
import { Textbox } from './field/textbox';
import { TextArea } from './field/textarea';
import { Button } from './field/button';
import { Image } from './field/image';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() fields: Base<any>[] = [new Image({
    src:"assets/imgs/angular2-small.png"
  }),
  new Textbox({
    label:"头像:",
    placeholder:"上传头像",
    type:"file"
  }),new Textbox({
    label:"用户名:",
    placeholder:"用户名"
  }),new Textbox({
    label:"常用邮箱:",
    placeholder:"常用邮箱"
  }),new Textbox({
    label:"密码:",
    type:"password",
    placeholder:"密码，至少8位"
  }),new Textbox({
    label:"重复密码:",
    type:"password",
    placeholder:"重复密码"
  }),new TextArea({
    label:"个人简介:",
    placeholder:"个人简介，最多140字，不能放链接。",
    rows:3,
  }),new Button({
    label:"",
    value:"保存"
  })];
  form: FormGroup;

  constructor(public router: Router,
    public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.form = this.toFormGroup(this.fields);

    this.activeRoute.params.subscribe(
      params => { console.log(params) }
    );
  }

  toFormGroup(fields: Base<any>[] ) {
    let group: any = {};

    fields.forEach(field => {
      group[field.key] = new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}