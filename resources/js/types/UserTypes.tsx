export type IUser = {
    id: number;
    email: string;
    name: string;
    isSuperAdmin: boolean;
    permissions: string[];
    can: (p: string) => boolean;
}
