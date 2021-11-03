export const getDateAndTime = (today : Date) => {
    const date = today.getDate() +'-'+(today.getMonth()+1) +'-'+ today.getFullYear();
    const time = today.getHours()+':'+(today.getMinutes()+1)+':'+today.getSeconds();
    return date + ' ' + time;
}