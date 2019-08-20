import { Component, OnInit } from '@angular/core';

import { from, of } from 'rxjs';
import { groupBy, map, reduce, mergeMap, toArray } from 'rxjs/operators';

const lists = [
  {parents: "abc", title: "a"},
  {parents: "abc", title:"b"},
  {parents: "123", title:"one"},
  {parents: "123", title:"two"},
  {parents: "other", title: "yay"}
];
let groups: {group: string, items: string[]}[];
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  groups: any;

  ngOnInit(){
    this.setList();
  }
  setList(){
    console.log('setListCalled');
    from(lists).pipe(
      groupBy(v => v.parents),
      mergeMap(group => group.pipe(toArray(), map(items => ({ group: group.key, items })))),
      toArray()
    ).subscribe(grouped => this.groups = grouped);
  }
}
