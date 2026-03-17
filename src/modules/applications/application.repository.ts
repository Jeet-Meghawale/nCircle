import { prisma } from "../../database/client";

export const applicationRepository = {
    createApplication(data: any ){
        return prisma.projectApplication.create({
            data
        })
    },
    getApplicationById(id:string){
        return prisma.projectApplication.findUnique({
            where : {id}
        });
    },
    getApplication(filter: any){
        return prisma.projectApplication.findMany({
            where : filter
        });
    },
    updateApplication(id: string , data:any){
        return prisma.projectApplication.update({
            where : {id},
            data
        });
    },
    createApplicationMember(dto:any){
        return prisma.applicationMember.create(
            dto
        );
    },
    
    
}