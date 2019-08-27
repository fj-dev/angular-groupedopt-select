import { Component, OnInit } from '@angular/core';

import { from, of } from 'rxjs';
import { groupBy, map, reduce, mergeMap, toArray } from 'rxjs/operators';

const lists = [
  {parents: "abc", title: "a", value: "A"},
  {parents: "abc", title:"b", value: "B"},
  {parents: "123", title:"one",value: "1"},
  {parents: "123", title:"two", value: "2"},
  {parents: "other", title: "yay", value: "Other Yay"}
];
let groups: {group: string, options: {title: string, value: string}[]}[];
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  groups: any;
  tempVal: string;

  ngOnInit(){
    this.setList();
  }
  setList(){
    console.log('setListCalled');
    from(lists).pipe(
      groupBy(v => v.parents),
      mergeMap(group => group.pipe(toArray(), 
        map(options => (
          { group: group.key, options}
        )))),
      toArray()
    ).subscribe(grouped => this.groups = grouped);
  }
  setVal(val){
    this.tempVal = val;
  }
}
