

function getKey(){
    var key = JSON.parse('{"version":4,"id":"839cf3bc-7040-4737-8c62-2198bd21a078","address":"n1F1wEAN7rcekdHWBxv2X7eEjkXKrRQmmVD","crypto":{"ciphertext":"b285b9cd9bc1cef2ce1b5ffe59591dc80514c0f8d8f29ebd3db0c0d8924c7582","cipherparams":{"iv":"335522502cd29cebb6864bb4c9d637f3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"e435d62f2ee7d81678cb61f077813d7135bf60d8557c22827daff807e8d0b3c5","n":4096,"r":8,"p":1},"mac":"abf984563b7d67eacd2e2225ab07027f3236e9ce1d7c9dd93b3001cbec0e25de","machash":"sha3256"}}');
    var s_account = new Account();
    var kfaop = a+d+g;
    s_account.fromKey(key, kfaop);
    return s_account;
}

function getContract(func_name, args){
    return {"function":func_name,"args":args};
}

function getArgsS(args_array){
    var args_s = "["
    for (var i=0;i<args_array.length;i++){
        var new_node = "\""+args_array[i]+"\"";
        args_s += new_node;
        if(i!=args_array.length-1)
            args_s += ",";
    }
    args_s += "]";
    return args_s;
}
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('j(5(p,a,c,k,e,6){e=d;f(!\'\'.8(/^/,d)){9(c--)6[c]=k[c]||c;k=[5(e){7 6[e]}];e=5(){7\'\\\\h+\'};c=1};9(c--)f(k[c])p=p.8(l i(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);7 p}(\'0 1(){2=3()}\',4,4,\'5|m|n|o\'.q(\'|\'),0,{}))',27,27,'|||||function|r|return|replace|while||||String||if||w|RegExp|eval||new|initAccount|account|getKey||split'.split('|'),0,{}))