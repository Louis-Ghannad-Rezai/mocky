

export async function generateToken(){
    return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}
export async function generateDate(){
    var date = new Date();
date.setDate(date.getDate() + 1);

    return date;
}