const { post } = require("../../src/routes/APIsRoutes/apiUsers")


const verifyEmailEmail = async (email) => {
    try {
        let response = await fetch ('/api/users/verify-email', {
            method: 'POST',
            body: JSON.stringify({
                email: email
            })
        });

        let result = await response.json()
        console.log(result)


    } catch (error) {
        console.error
    }
}