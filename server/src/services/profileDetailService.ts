import ProfileData from "../models/ProfileData";

export  async function saveProfileDetails(ProfData:any){
    const data = new ProfileData(ProfData)
    await data.save()
    return data;
}

export async function getProfileDetails(userId:string){
    const data = await ProfileData.findOne({userId:userId})
    return data;
}