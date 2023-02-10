Function.prototype.bind=function(context=window,...args){
    if(typeof this !== 'function'){
        throw new Error('type Error');
    }
    var self = this;
    return function F(){
        if(this instanceof F){
            return new self(...args,...arguments)
        }
        return self.apply(context,[...args,...arguments])
    }
}