import conf from "../conf/conf";
// these things are from appwrite to use its services
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //for creating account we have to create a function that work undehood such that useccounr don't know how these services gona work

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //after creating account just login with the email and password
        return this.login(email, password);
      } else {
        userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //method to get the user

  async getCurrentUser() {
    try {
      const user= await this.account.get();
      return user
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout(){
   try{
     await this.account.deleteSessions();
   }catch(error){
       console.log("Appwrite service::logout::error",error)
   }
  }
}

//inseatd of exporting a class we just export the object so that user can easily acess  to all the properties of it
const authservice = new AuthService();
//we want when we call our object then it create a client and a account
export default authservice;
