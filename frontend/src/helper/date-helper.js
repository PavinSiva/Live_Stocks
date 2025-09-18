export const convertDateToUnixTimeStamp = (date)=>{
    return Math.floor(date.getTime() / 1000 )
}

export const convertUnixTimeStampToDate = (unixTimeStamp) =>{
    const milliSecond = unixTimeStamp * 1000 
    return new Date(milliSecond).toLocaleDateString()
}
export const createDate = (date , days , weeks , months , years) => {
    let newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days + 7 * weeks)
    newDate.setMonth(newDate.getMonth() + months)
    newDate.setFullYear(newDate.getFullYear() + years)

    return newDate
}