import ProfileData from "../models/ProfileData";

export default async function saveProfileDetails(ProfData:any){
    const data = new ProfileData(ProfData)
    await data.save()
    return data;
}