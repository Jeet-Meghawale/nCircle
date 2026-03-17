import { ApplicationStatus, MemberRole } from "@prisma/client";
import { applicationRepository } from "./application.repository";
import { CreateApplicationServiceInput, UpdateApplicationServiceInput } from "./application.types";
import { prisma } from "../../database/client";
import { application } from "express";
import { ApiError } from "../../utils/api.error";

export const applicationService = {
    async getApplicationById(id: string) {
        return await applicationRepository.getApplicationById(id);
    },
    async createApplication(data: CreateApplicationServiceInput) {
        const { leaderId, coordinatorId, projectId, members } = data;

        // remove duplicates
        const uniqueMembers = Array.from(
            new Map(members.map(m => [m.userId, m])).values()
        );

        // ensure  leader exist
        const finalMembers = uniqueMembers.some(m => m.userId === leaderId)
            ? uniqueMembers
            : [...uniqueMembers, { userId: leaderId, role: MemberRole.LEADER }];

        //max 7 members
        if (finalMembers.length > 7) {
            throw new Error("Maximum 7 members allowed");
        }
        // transaction (atomic operation)
        return await prisma.$transaction(async (tx) => {
            const application = await tx.projectApplication.create({
                data: {
                    projectId,
                    leaderId,
                    coordinatorId
                }
            });
            await Promise.all(
                finalMembers.map(member =>
                    tx.applicationMember.create({
                        data: {
                            applicationId: application.id,
                            userId: member.userId,
                            role: member.role
                        }
                    })
                )
            )
            return application;
        });
    },
    async verifyApplication(id: string) {
        const data = {
            status: ApplicationStatus.PENDING_ADMIN,
            verifiedAt: new Date()
        };
        return applicationRepository.updateApplication(id, data);

    },
    async approveApplication(id:string, userId:string){
        const data={
            status: ApplicationStatus.APPROVED,
            approvedAt : new Date(),
            approvedBy: userId,
            isApproved : true
        }
        return applicationRepository.updateApplication(id,data);
    },
    async cancelApplication(id:string,userId:string){
        const application = await applicationRepository.getApplicationById(id);
        if(application?.leaderId !== userId){
            throw new ApiError(403,"You are tot Project Leader")
        }
        const data ={
            status : ApplicationStatus.CANCELLED,
            isApproved : false
        }
        return applicationRepository.updateApplication(id,data);
    },
    async rejectApplication(id:string){
        const data={
            isApproved : false,
            status:ApplicationStatus.REJECTED,
        }
        return applicationRepository.updateApplication(id,data);
    },
    async updateApplication(id:string, dto :UpdateApplicationServiceInput){
        return applicationRepository.updateApplication(id,dto);

    },


}