"use strict";

var NewbeeTown = function() {
    LocalContractStorage.defineProperties(this, {
        adminPass: null,
        sentGiftCount:null,
        currentCoinCount: null,
        giftCoinCount: null
    });
    LocalContractStorage.defineMapProperties(this, {
        walletAddress: null,
        leftWords: null
    });
};
NewbeeTown.prototype = {
    init: function(admin_pass, gift_coin_count) {
        this.adminPass = admin_pass;
        this.sentGiftCount = 0;
        this.currentCoinCount = new BigNumber(0);
        this.giftCoinCount = new BigNumber(gift_coin_count);
        //
    },
    setGiftCoinCount: function(new_gift_coin_count, admin_pass) {
        if (this.adminPass != admin_pass)
            throw new Error("you are not administrator, bad guy!");
        this.giftCoinCount = new BigNumber(new_gift_coin_count);
        return "update giftCoinCount successfully";
    },
    _sendGift: function(address) {
        var tmpGiftCoinCount = new BigNumber(this.giftCoinCount);
        var tmpCurrentCoinCount = new BigNumber(this.currentCoinCount);
        var result = Blockchain.transfer(address, tmpGiftCoinCount);
        console.log("transfer result:", result);
        Event.Trigger("transfer", {
            Transfer: {
                from: Blockchain.transaction.to,
                to: address,
                value: value
            }
        });
        this.currentCoinCount = new BigNumber(tmpCurrentCoinCount.minus(tmpGiftCoinCount));
        return result;
    },
    _saveWords: function(address, words, date_time) {
        var tmpSentGiftCount = this.sentGiftCount;
        var words_and_info = { id: tmpSentGiftCount, text: words, dateTime: date_time };
        this.leftWords.put(tmpSentGiftCount, words_and_info);
        this.walletAddress.put(address, tmpSentGiftCount);
        tmpSentGiftCount = tmpSentGiftCount + 1;
        this.sentGiftCount = tmpSentGiftCount;
    },
    getWords: function(index){
        return this.leftWords.get(index);
    },
    request: function(address, words, date_time) {
        var from = Blockchain.transaction.from;
        var g_address = this.walletAddress.get(address);
        var s_test = g_address;
        if (g_address!=null)
            throw new Error("YOU HAVE GOTTEN ONCE BEFORE");
        var tmpGiftCoinCount = new BigNumber(this.giftCoinCount);
        var tmpCurrentCoinCount = new BigNumber(this.currentCoinCount);
        var result = Blockchain.transfer(address, tmpGiftCoinCount);
        this.currentCoinCount = new BigNumber(tmpCurrentCoinCount.minus(tmpGiftCoinCount));
        var tmpSentGiftCount = this.sentGiftCount;
        var words_and_info = { id: tmpSentGiftCount, text: words, dateTime: date_time };
        this.leftWords.put(tmpSentGiftCount, words_and_info);
        this.walletAddress.put(address, tmpSentGiftCount);
        tmpSentGiftCount = tmpSentGiftCount + 1;
        this.sentGiftCount = tmpSentGiftCount;
        return true;
    },
    getAddressIndex(addr){
        return this.walletAddress.get(addr);
    },
    getRestGiftCount: function(){
        var tmpCurrentCoinCount = new BigNumber(this.currentCoinCount);
        var tmpGiftCoinCount = new BigNumber(this.giftCoinCount);
        return tmpCurrentCoinCount.div(tmpGiftCoinCount);
    },
    getCurrentGiftCoinCount: function(){
        return this.giftCoinCount;
    },
    getCurrentCoinCount: function(){
        return this.currentCoinCount;
    },
    getSentGiftCount: function(){
        return this.sentGiftCount;
    },
    getInfo: function(){
        return {"giftCoinCount":this.giftCoinCount,"currentCoinCount":this.currentCoinCount,"sentGiftCount":this.sentGiftCount};
    },

    donate: function() {
        var tmpCurrentCoinCount = this.currentCoinCount;
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        value = new BigNumber(value);
        this.currentCoinCount = new BigNumber(value.plus(tmpCurrentCoinCount));
        return "Thankyou for your generosity!"
    }
};
//console.log(NewbeeTown.test2());
module.exports = NewbeeTown;