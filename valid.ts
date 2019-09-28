function valid(value: number | boolean | string, pattern?: Object) {
    let isValid = [];
    if (typeof value != "undefined") {
        if (pattern) {
            Object.keys(pattern).map(restriction => {
                // executeFunctionByName(restriction, window)
                console.log("123");
                
                executeFunctionByName("IsNumber", window , value , pattern[restriction])
                // ["restriction"]()
                // isValid.push()
            })            
        }
    }    
}


/** 
 * @param functionName 
     * @type string 
     * atanan fonksiyon ismi
 * @param context 
     * window nesnesi
 * @param arguments 
     * @type string | number | boolean 
     * kontrol edilmesi istenen deger
 * @param objectValue 
     * @type boolean | number | string
     * pattern e uygunluk kontrollrinin saglanmasi icin tanimlanan deger
 */
function executeFunctionByName(functionName, context , arguments , objectValue) {   
    return context[functionName].apply(context,[arguments, objectValue])
};

function IsNumber(value, objectValue) {
    console.log("OSMAN",objectValue);    
    if (typeof value == "number") return true;
    else return false;
}

valid(3, {IsNumber:false})