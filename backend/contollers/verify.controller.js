import { user } from "../services/user.service"

export const verify = (req) => {
    const { address } = req.params
    const { signature, message } = req.body

    if (!address) return withoutField('address')

    return user.verify(address, signature, message)
}
