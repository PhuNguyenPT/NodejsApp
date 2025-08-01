import { JwtPayload } from "jsonwebtoken";

import { Permission, Role, UserStatus } from "@/type/enum/user.js";

// Extend the standard JwtPayload with our custom claims
export interface CustomJwtPayload extends JwtPayload {
    email: string;
    id: string;
    name?: string;
    permissions?: Permission[];
    role: Role;
    status: UserStatus;
}
