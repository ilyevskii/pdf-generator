import axios from "axios";
import {User} from "../contexts/Auth/AuthReducer";

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

    async upload_image(user: User, image: File): Promise<void> {

        const formData: FormData = new FormData();
        formData.append("image", image as File);
        formData.append("id", user.id as string);

        try {
            const response = await axios.post(`${this.url}/upload`, formData);
            console.log(response.data);

        } catch (err: any) {
            console.log(err.toString());
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