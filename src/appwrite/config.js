import conf from "../conf/conf.js";
import { Client,ID,Storage, Query ,Databases} from "appwrite";

export class Service{
   Client=new Client();
    databases;
    bucket;

    constructor(){
        this.Client
             .setEndpoint(conf.appwriteUrl)
             .setProject(conf.appwriteProjectId)
        //after setting the client we have to intialize the database 
        this.databases=new Databases(this.Client)
        this.bucket=new Storage(this.Client)
        
    }
    //write methods here 
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const postdata= await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
            return postdata;
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }


    async updatePost(slug,{title, content, featuredImage, status}){
        try{
         return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
         )
        }
        catch(error){
         console.log(error)
        }
    }
    
    async deletePost(slug){
        try{
          await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
           console.log(error)
           return false
        }
    }

    async getPost(slug){
        try{
           return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           )
        }
        catch(error){

        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
           return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
           )
        }
        catch(error){
            console.log(error)
            return false;
        }
    }

    //file upload method 

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
           conf.appwriteBucketId,
           fileId 
        )
    }
}

const service=new Service();
export default service