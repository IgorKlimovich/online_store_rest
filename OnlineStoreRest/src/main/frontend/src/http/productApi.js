import {$host} from "./index";

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('products/' + id)
    return data
}