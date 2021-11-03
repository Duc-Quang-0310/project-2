
export const randomID = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const randomNumb = (length: number) => {
  let result = '';
  for( let i = 0;i < length; i++ ){
    result += Math.floor(Math.random()* 10);
  }
  return result
}


export const randomStatus= ():"done" | "pending" | "cancel" => {
  let result:"done" | "pending" | "cancel" = 'done';
  const numb = Math.floor(Math.random()* 3);
  if( numb === 0) {
    result = "done"
  }
  if( numb === 1) {
    result = "pending"
  }
  if( numb === 2) {
    result = "cancel"
  }
  return result
}
