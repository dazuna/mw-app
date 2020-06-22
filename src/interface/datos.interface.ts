export interface Datos{
  username:string;
  password:string;
  nombre:string;
  apellidos:string;
  enabled: number;
  userType: string;
  headerImage:string;
  profileImage:string;
}

 export interface Hitch{
   company: string,
   companyName: string,
   companyProfilePic: string,
   contactName: string,
   idContact: string,
   idHitch: string,
   offerCreationDate: string,
   offerJob: string,
   offerReward: String,
   userName: string,
   username: string,
   userPhoto: string,
   userProfilePic: string,
   tipo: string
 }

 export interface Email{
   contactMail: string,
   nombre: string,
   mailSubject:string,
   bodyMailTXT:string,
   bodyMailHTML:string
 }
