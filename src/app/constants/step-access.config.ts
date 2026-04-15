import { UserGroups } from "@/models/usergroups/usergroups.enum";

export const STEP_ACCESS: Record<number, UserGroups[]> = {
    1: [UserGroups.ADMIN, UserGroups.RESOURCEMANAGER, UserGroups.SERVICEMANAGER],
    2: [UserGroups.CONSULTANCY],
    3: [UserGroups.GUESTUSER, UserGroups.RESOURCEMANAGER, UserGroups.ADMIN, UserGroups.SERVICEMANAGER],
    4: [UserGroups.ADMIN, UserGroups.RESOURCEMANAGER, UserGroups.SERVICEMANAGER],
    5: [UserGroups.ADMIN, UserGroups.GUESTUSER, UserGroups.RESOURCEMANAGER, UserGroups.SERVICEMANAGER],
    6: [UserGroups.RESOURCEMANAGER, UserGroups.ADMIN, UserGroups.SERVICEMANAGER],
    7: [UserGroups.CONSULTANCY, UserGroups.ADMIN, UserGroups.RESOURCEMANAGER, UserGroups.SERVICEMANAGER]
}