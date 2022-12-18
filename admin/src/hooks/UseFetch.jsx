


export const UseFetch = async (endpoint, method = "GET", data, token) => {
    const apiUrlBase = "http://localhost:4000/api"; 


    const url = apiUrlBase + endpoint;

    let response;

    if(method === "GET"){
        response = await fetch(url) 
    }

    if(method === "POST"){
        response = await fetch(url,{
            method,
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json",
                Authorization : token
            }
        })
    }

    let result = await response.json()

    return result
}