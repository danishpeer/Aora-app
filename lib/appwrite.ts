import { appwriteConfig } from '@/appwriteConfig';
import { Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage } from 'react-native-appwrite';



// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;
const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email: string, password: string, username:string) => {
    try {
        const newAcc = await account.create(ID.unique(), email, password, username);
        if(!newAcc) throw Error;
        //add a new profile picture
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await db.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId, 
            ID.unique(), 
            {
            accountId: newAcc.$id,
            email,
            username,
            avatar: avatarUrl
        })
        return newUser;
    } catch (error: any) {
        console.log(error)
        throw new Error(error);
    }
}

export const signIn = async (email:string, password:string) => {
    try {
        console.log(email, password);
        const session = await account.createEmailPasswordSession(email, password);



        return session;
    } catch (error:any) {
        console.log(error);
        throw new Error("Invalid Credentials")
    }
    
}
export const getCurrentUser = async () => {
    try {
        const currAcc = await account.get();

        if(!currAcc) throw Error;
        const currUser = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currAcc.$id)]);

        if(!currUser) throw Error;

        return currUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc("$createdAt")]);
        
        return posts.documents
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.orderDesc("$createdAt"), Query.limit(7)]);
        
        return posts.documents
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export const searchPosts = async (query: any) => {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.search('title', query)]);
        
        return posts.documents
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export const getUserPosts = async (userId: any) => {
    try {
        const posts = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, [Query.equal('creator', userId), Query.orderDesc("$createdAt")]);
        
        return posts.documents
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export const signout = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
        
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getFilePreview = async ( fileId : any, type: string) => {
        let fileUrl;
        try {
            if(type=="video"){
                    fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
            }
            else if(type=="image"){
                    fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top , 100);
          
            }
            else{
                throw new Error('Invalid file type')
            }

            if(!fileUrl){
                throw new Error;
            }

            return fileUrl;
            
        } catch (error: any) {
            throw new Error(error)
    
        }
}
function extractSubstringFromLastPeriod(inputString: string) {
    // Find the last occurrence of the period
    const lastPeriodIndex = inputString.lastIndexOf('.');
  
    // If there is no period in the string, return the entire string
    if (lastPeriodIndex === -1) {
      return null;
    }
  
    // Extract the substring from the last period to the end of the string
    return inputString.substring(lastPeriodIndex + 1);
  }


export const uploadFile = async ( file : any, type: string) => {
    if(!file) return;
    // this was for document picker
    // const {mimeType, ...rest}  = file;
    // const asset = {type: mimeType, ...rest};
    // console.log('FILE',file)
    const asset = {
        name: `newFile.${extractSubstringFromLastPeriod(file.uri)}`,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri

    }

    try {

        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);

        
        const fileUrl  = await getFilePreview(uploadedFile.$id, type)
        return fileUrl;
    } catch (error: any) {
        throw new Error(error)

    }
}

export const createVideo = async ( form : any) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);
        const newPost = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail : thumbnailUrl,
            video : videoUrl,
            prompt: form.prompt,
            creator: form.userId
        })

        return newPost
        
    } catch (error: any) {
        throw new Error(error)
    }
}


