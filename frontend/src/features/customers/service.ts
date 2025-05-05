import axios from "@/lib/axios";

export class CustomerService
{
    static async get(id: number) {
        const response = await axios.get(`/api/customers/${id}`)
        return response.data
    }

    static async getAll() {
        const response = await axios.get('/api/customers')
        return response.data
    }
}