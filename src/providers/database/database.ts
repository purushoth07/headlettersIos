import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject  } from '@ionic-native/sqlite';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {


	dbObj : SQLiteObject;

  constructor(public http: Http,public sqlite: SQLite) {
    //console.log('Hello DatabaseProvider Provider');


    this.sqlite.create({
  name: 'ionic.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


    db.executeSql('create table user(name VARCHAR(32), password VARCHAR)', {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

  })
  .catch(e => console.log(e));
  }

public addUser(usrname : string, password :string){
		this.sqlite.create({
  name: 'ionic.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {

  	debugger;
  	var query = "INSERT INTO user(name,password) VALUES ( '"+usrname+"' , '"+password+"' )";
  	console.log(query);

    db.executeSql(query, {})
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));

  })
  .catch(e => console.log(e));

}

public printAll() {
	this.sqlite.create({
  name: 'ionic.db',
  location: 'default'
})
  .then((db: SQLiteObject) => {


   db.executeSql("SELECT * FROM user", []).then((data) => {
            
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    //this.people.push({firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname});

                    console.log('username '+data.rows.item(i).name+' , password :'+data.rows.item(i).password);
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });

  })
  .catch(e => console.log(e));

    }
}
