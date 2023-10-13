import axios from "axios"

export const commonRequest = async (method,url,body,header) => {
    let config = {
        method:method,
        url:url,
        headers:header ? header : 'application/json',
        data:body
    }
    return axios(config).then(response => {
        console.log(response)
        return response
    }).catch(err => {
        console.log(err)
        return err
    })
}