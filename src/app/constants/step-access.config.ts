import { UserGroups } from "@/models/usergroups/usergroups.enum";

export const STEP_ACCESS: Record<number, UserGroups[]> = {
    1: [UserGroups.ADMIN, UserGroups.RESOURCEMANAGER],
    2: [UserGroups.CONSULTANCY],
    3: [UserGroups.GUESTUSER, UserGroups.RESOURCEMANAGER, UserGroups.ADMIN],
    4: [UserGroups.ADMIN, UserGroups.RESOURCEMANAGER],
    5: [UserGroups.ADMIN, UserGroups.GUESTUSER, UserGroups.RESOURCEMANAGER],
    6: [UserGroups.RESOURCEMANAGER, UserGroups.ADMIN],
    7: [UserGroups.CONSULTANCY, UserGroups.ADMIN, UserGroups.RESOURCEMANAGER]
}