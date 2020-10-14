

function buildConstellioAuthenticatedHeader(token:string | undefined) {

    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    };
}