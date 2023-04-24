import axios from "axios";

interface User {
    id: number | string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
}

export class UserRepository {

    private readonly url: string = "http://localhost:3001";
    constructor(url?: string) {
        if (url) this.url = url;
    }

    async get_user_info(user: User): Promise<User> {
        try {
            const response = await axios.get(`${this.url}/api/user/${user.id}`);
            return {
                id: response.data.id,
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName
            }
        }
        catch (err: any) {
            throw err;
        }
    }

    async delete_account(user: User): Promise<boolean> {
        try {
            await axios.delete(`${this.url}/api/user/${user.id}`, {data: user});
            return true;
        }
        catch (err: any) {
            throw err;
        }
    }

    async change_account_info(user: any): Promise<boolean> {
        try {
            await axios.put(`${this.url}/api/user/${user.id}`, user);
            return true;
        }
        catch (err: any) {
            throw err;
        }
    }


    async generate_new_pdf(user: User) {
        try {
            const response = await axios.post(`${this.url}/api/user/pdf`, {email: user.email});
            const pdf = response.data;

            const bytes: Uint8Array = new Uint8Array(pdf.data);
            const blob: Blob = new Blob([bytes], {type: 'application/pdf'});
            return URL.createObjectURL(blob);
        }
        catch (err: any) {
            throw err;
        }
    }
}