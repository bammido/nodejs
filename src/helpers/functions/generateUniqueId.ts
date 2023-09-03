import { v4 as uuidV4 } from 'uuid'


export default function generateUniqueId(): string {
    return uuidV4()
}