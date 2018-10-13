export default function splitOnCapital(string){
    const capitalChars = string.match(/[A-Z]/g)
    let newString = [];
    for(let i =0;i<string.length;i++){
        let char;
        if (string[i] !== ' ' && string[i+1] && string[i+1].match(/[A-Z]/)){
            char=string[i]+" "
        }else{
            char=string[i]
        }
        newString.push(char)
    }
    return newString.join('');
}

