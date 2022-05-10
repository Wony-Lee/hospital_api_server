export function validationCheck(param) {
    if(!param) return null;
    for(let [key, val] of Object.entries(param)) {
        // console.log(val, key)
        if(!val) throw new Error(`${key} is Not Empty`)
    }
}
