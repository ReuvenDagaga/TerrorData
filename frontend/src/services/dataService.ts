import axios from "axios"

export const getDeadliestAttackTypes = async (url: string) => {
    const response = await axios.get(url)
    return response.data
}
