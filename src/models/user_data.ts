export class UserData{
	  public id:string;
		public uid:string;
	  public user_name:string;
	  public access_token:string;
	  public api_token:string;
	  public first_name:string;
	  public last_name:string;
	  public email:string;
	  public phone:string;
	  public user_image:string;
	  public provider:string;
		public gender:string;
		public language:string;

		get getId():string{
      return this.id;
    }

    set setId(id:string){
         this.id = id;
     }
}
