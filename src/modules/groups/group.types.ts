import { MemberRole } from "@prisma/client"

export interface createGroupDTO{
  projectId :String,
  applicationId :String,
  coordinatorId :String,
  members: {
      userId: string
      role: MemberRole
    }[]
}

export interface updateGroupDTO{
  projectId? :String,
  applicationId? :String,
  coordinatorId? :String
}
